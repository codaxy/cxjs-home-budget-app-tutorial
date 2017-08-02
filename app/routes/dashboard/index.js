import {HtmlElement, Section, FlexRow, Repeater, Rescope} from 'cx/widgets';
import {
    CategoryAxis,
    Chart,
    Column,
    Gridlines,
    LineGraph,
    Marker,
    NumericAxis,
    PieChart,
    PieSlice,
    ColorMap,
    Legend
} from "cx/charts";
import {Svg, Text} from "cx/svg";
import {KeySelection} from "cx/ui";

import Controller from './Controller';

export default <cx>
    <h2 putInto="header">Dashboard</h2>
    <div controller={Controller}>
        <FlexRow wrap spacing>

            <Section mod="card">
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

            <Section mod="card">
                <div class="kpi-header">
                    Counter
                </div>
                <div class="kpi-main">
                    <div class="kpi-value">
                        5,253
                    </div>
                    <div class="kpi-value-text">
                        Users
                    </div>
                </div>
                <div class="kpi-footer">
                    10% More This Month
                </div>
            </Section>

            <Section mod="card">
                <div class="kpi-header">
                    Bars
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
                            <Repeater records:bind="bars" recordName="$point">
                                <Column
                                    width={0.8}
                                    colorIndex:bind="$point.colorIndex"
                                    x:bind="$point.day"
                                    y:bind="$point.value"
                                />
                            </Repeater>
                        </Chart>
                    </Svg>
                </div>
                <div class="kpi-footer">
                    Weekends are Off
                </div>
            </Section>

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
            </Section>
        </FlexRow>
    </div>
</cx>
