import {HtmlElement, Section, FlexRow, Repeater, FlexCol, Text, MonthField} from 'cx/widgets';
import {
    CategoryAxis,
    Chart,
    Column,
    Bar,
    Gridlines,
    NumericAxis,
    PieChart,
    PieSlice,
    ColorMap,
    Legend,
    TimeAxis,
    LineGraph
} from "cx/charts";
import {Svg, Text as SvgText} from "cx/svg";
import {KeySelection, tpl, bind, expr, computable} from "cx/ui";

import Controller from './Controller';
import {categoryNames, subCategoryNames} from '../../data/categories';

export default <cx>
    <h2 putInto="header">Dashboard</h2>
    <div controller={Controller}>
        <div putInto="sidebar">
            <MonthField range 
                label="Period" 
                from={bind('$page.range.from')} 
                to={bind('$page.range.to')}
                showClear={false} />
        </div>
        <FlexRow wrap spacing>
            <ColorMap />
            <Section
                mod="card"
                title="Overview by Categories"
                hLevel={3}
                style="max-width: 300px;"
            >
                <FlexCol align="center" spacing>
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
                                    tooltip={{
                                        text: {
                                            tpl: "{$record.amount:n;2}"
                                        },
                                        trackMouse: true
                                    }}
                                />
                            </Repeater>
                        </PieChart>
                    </Svg>
                    <Legend/>
                </FlexCol>
            </Section>

            <Section
                mod="card"
                header={
                    <h3 text={computable('$page.selectedCatId', catId => categoryNames[catId] || 'All')}/>
                }
                style="max-height: 400px"
            >
                <div>
                    <Svg style={{
                        width: "100%",
                        height: {expr: "40 + {$page.bars.length} * 25"}
                    }}>
                        <Chart offset="20 -20 -20 130" axes={{
                            x: {type: NumericAxis, snapToTicks: 0},
                            y: {type: CategoryAxis, vertical: true, snapToTicks: 1, inverted: true, names: subCategoryNames }
                        }}>
                            <Gridlines yAxis={false}/>
                            <Repeater
                                records={bind("$page.bars")}
                                recordName="$point"
                                sorters={[{field: 'amount', direction: 'DESC'}]}
                            >
                                <Bar
                                    size={0.8}
                                    x={bind("$point.amount")}
                                    y={bind("$point.id")}
                                    tooltip={tpl("{$point.amount:n;2}")}
                                    colorName={bind("$point.categoryName")}
                                    colorMap="pie"/>
                            </Repeater>
                        </Chart>
                    </Svg>
                </div>
            </Section>

            <Section mod="card" header={<h3>Monthly overview</h3>} style="min-width: 274px">
                <div >
                    <Svg style="width: 100%; height:100%;">
                        <Chart
                            offset="10 -10 -20 50"
                            axes={{x: <TimeAxis />, y: <NumericAxis vertical/>}}
                        >
                            <Gridlines xAxis={false}/>
                            <Repeater records={bind("$page.histogramTotal")} recordName="$point" keyField="id">
                                <Column
                                    width={bind('$point.width')}
                                    offset={expr("{$point.width}/2")}
                                    x={bind("$point.date")}
                                    y={bind("$point.amount")}
                                    tooltip={tpl("{$point.amount:n;2}")}
                                />
                            </Repeater>
                            <Repeater records={bind("$page.histogram")} recordName="$point" keyField="id">
                                <Column
                                    width={bind('$point.width')}
                                    offset={expr("{$point.width}/2")}
                                    x={bind("$point.date")}
                                    y={bind("$point.amount")}
                                    tooltip={tpl("{$point.amount:n;2}")}
                                    colorName={bind("$point.categoryName")}
                                    colorMap="pie"/>
                            </Repeater>
                        </Chart>
                    </Svg>
                </div>
            </Section>

            <Section mod="card" header={<h3>Total</h3>}>
                <div class="kpi-main">
                    <div>Expenses</div>
                    <div class="kpi-value">
                        
                        <Text tpl='${$page.expensesTotal:n;2}'/>
                    </div>
                    <div style="margin-top: 20px;">Incomes</div>
                    <div class="kpi-value">
                        <Text tpl='${$page.incomesTotal:n;2}'/>
                    </div>
                    <div style="margin-top: 20px;">Balance</div>
                    <div class="kpi-value">
                        <Text tpl='${$page.balance:n;2}'/>
                    </div>
                </div>
            </Section>

            <Section mod="card" header={<h3>Balance</h3>}>
                <div style="width: 450px; height: 300px;">
                    <Svg style="width: 100%;">
                        <Chart offset="20 -20 -20 50" axes={{ x: { type: TimeAxis }, y: { type: NumericAxis, vertical: true }}}>
                            <Gridlines />
                            <LineGraph
                                data={bind('$page.balanceData')}
                                xField='date'
                                yField='value'
                                colorIndex={0}
                                area
                            />
                        </Chart>
                    </Svg>
                </div>
            </Section>

        </FlexRow>
    </div>
</cx>
