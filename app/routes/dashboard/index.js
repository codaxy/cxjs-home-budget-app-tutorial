import {HtmlElement, Section, FlexRow, Repeater, Rescope, Text} from 'cx/widgets';
import {
    CategoryAxis,
    Chart,
    Column,
    Bar,
    Gridlines,
    LineGraph,
    Marker,
    NumericAxis,
    PieChart,
    PieSlice,
    ColorMap,
    Legend
} from "cx/charts";
import {Svg, Text as SvgText} from "cx/svg";
import {KeySelection, tpl, bind} from "cx/ui";

import Controller from './Controller';

export default <cx>
    <h2 putInto="header">Dashboard</h2>
    <div controller={Controller}>
        <FlexRow wrap spacing>
            <Section mod="card" header={<h3>Overview by Categiries</h3>}>
                <FlexRow align="center">
                    <Svg style="width:180px; height:100%;">
                        <ColorMap />
                        <PieChart>
                            <Repeater records:bind="$page.pie" idField="id">
                                <PieSlice
                                    value:bind="$record.amount"
                                    r={90}
                                    r0={30}
                                    offset={4}
                                    name:bind="$record.name"
                                    colorMap="pie"
                                    selection={{
                                        type: KeySelection,
                                        bind: '$page.selectedCatId',
                                        records: {bind: '$page.pie'},
                                        record: {bind: '$record'},
                                        index: {bind: '$index'},
                                        keyField: 'id'
                                    }}
                                />
                            </Repeater>
                        </PieChart>
                    </Svg>
                    <Legend vertical/>
                </FlexRow>
            </Section>

            <Section mod="card" header={<h3>Overview by Subcategories</h3>}>
                <div class="kpi-main" style="height: 400px; width: 400px">
                    <Svg style="width: 100%; height:100%;">
                        <ColorMap />
                        <Chart
                            offset="20 -20 -140 40"
                            axes={
                                {
                                    x: { type: CategoryAxis, labelRotation: -90, labelDy: '0.4em', labelAnchor: "end" },
                                    y: { type: NumericAxis, vertical: true }
                                }
                            }
                        >
                            <Gridlines xAxis={false}/>
                            <Repeater records:bind="$page.bars" recordName="$point">
                                <Column colorMap="bar" //:expr="15 - Math.round({$point.amount}*6/50)"
                                    width={0.8}
                                    x:bind="$point.name"
                                    y:bind="$point.amount"
                                    tooltip:tpl="{$point.amount:n;2}" />
                            </Repeater>
                        </Chart>
                    </Svg>
                </div>
            </Section>

            <Section mod="card" header={<h3>Total expenses</h3>}>
                <div class="kpi-main">
                    <div class="kpi-value">
                       <Text tpl='${$page.expensesTotal:n;2}'/>
                    </div>
                </div>
            </Section>

            {/*

            <Section mod="card">
                <div class="kpi-header">
                    Line
                </div>
                <div class="kpi-main">
                    <Svg style="width:200px; height:100%;">
                        <Chart
                            offset="5 0 -20 40"
                            axes={
                                {
                                    x: {type: CategoryAxis},
                                    y: {type: NumericAxis, vertical: true}
                                }
                            }
                        >
                            <Gridlines xAxis={false}/>
                            <LineGraph
                                data:bind="bars"
                                xField="day"
                                yField="value"
                                colorIndex={6}
                                lineStyle="stroke-width: 5px"
                            />
                            <Repeater records:bind="bars" recordName="$point">
                                <Marker
                                    size={10}
                                    class="line-marker"
                                    colorIndex={6}
                                    x:bind="$point.day"
                                    y:bind="$point.value"
                                    tooltip={
                                        {text: {tpl: "{$point.value:n;0}"}, placement: "up"}
                                    }
                                />
                            </Repeater>
                        </Chart>
                    </Svg>
                </div>
                <div class="kpi-footer">
                    Up and Rising
                </div>
            </Section>*/}
        </FlexRow>
    </div>
</cx>
