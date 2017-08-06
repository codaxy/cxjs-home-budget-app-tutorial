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
    Legend,
    TimeAxis,
    ColumnGraph,
    Range
} from "cx/charts";
import {Svg, Text as SvgText, Rectangle, ClipRect} from "cx/svg";
import {KeySelection, tpl, bind, expr, computable} from "cx/ui";

import Controller from './Controller';
import {categoryNames} from '../../data/categories';

export default <cx>
    <h2 putInto="header">Dashboard</h2>
    <div controller={Controller}>
        <FlexRow wrap spacing>
            <ColorMap />
            <Section mod="card" header={<h3>Overview by Categiries</h3>}>
                <FlexRow align="center">
                    <Svg style="width:180px; height:100%;">

                        <PieChart>
                            <Repeater records={bind("$page.pie")} idField="id">
                                <PieSlice
                                    value={bind("$record.amount")}
                                    r={90}
                                    r0={30}
                                    offset={4}
                                    name={bind("$record.name")}
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

            <Section mod="card" header={<h3 text={computable('$page.selectedCatId', catId => categoryNames[catId])} />}>
                <div class="kpi-main" style="height: 350px;">
                    <Svg style="width:100%; height:100%;">
                       <Chart offset="20 -20 -20 130" axes={{
                          x: { type: NumericAxis, snapToTicks: 0 },
                          y: { type: CategoryAxis, vertical: true, snapToTicks: 1 }
                       }}>
                          <Gridlines yAxis={false} />
                          <Repeater records={bind("$page.bars")} recordName="$point">
                            <Bar height={0.5}
                                 x={bind("$point.amount")}
                                 y={bind("$point.name")}
                                 tooltip={tpl("{$point.amount:n;2}")}
                                 colorName={bind("$point.categoryName")}
                                 colorMap="pie" />
                          </Repeater>
                       </Chart>
                    </Svg>
                </div>
            </Section>

            {/*<Section mod="card" header={<h3>Overview by Subcategories</h3>}>
                <div class="kpi-main" style="height: 450px; width: 400px">
                    <Svg style="width: 100%; height:100%;">

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
                            <Repeater records:bind="$page.bars" recordName="$point" keyField="id">
                                <Column 
                                    width={0.8}
                                    x:bind="$point.name"
                                    y:bind="$point.amount"
                                    colorName:bind="$point.categoryName"
                                    colorMap="pie"
                                    tooltip:tpl="{$point.amount:n;2}" />
                            </Repeater>
                        </Chart>
                    </Svg>
                </div>
            </Section>*/}

            <Section mod="card" header={<h3>Total expenses</h3>}>
                <div class="kpi-main">
                    <div class="kpi-value">
                       <Text tpl='${$page.expensesTotal:n;2}'/>
                    </div>
                </div>
            </Section>

            <Section mod="card" header={<h3>Monthly overview</h3>}>
                <div class="kpi-main" style="width: 450px">
                    <Svg style="width: 100%; height:100%;">
                        <Chart
                            offset="10 -20 -30 40"
                            axes={{ x: <TimeAxis />, y: <NumericAxis vertical /> }}
                        >
                            <Gridlines xAxis={false}/>
                            <Repeater records={bind("$page.histogram")} recordName="$point" keyField="id">
                                <Column 
                                    //colorIndex={7}
                                    width={bind('$point.width')}
                                    offset={expr("{$point.width}/2")}
                                    x={bind("$point.date")}
                                    y={bind("$point.amount")}
                                    tooltip={tpl("{$point.amount:n;2}")} 
                                    colorName={bind("$point.categoryName")}
                                    colorMap="pie" />
                            </Repeater>
                        </Chart>
                    </Svg>
                </div>
            </Section>

           
        </FlexRow>
    </div>
</cx>
