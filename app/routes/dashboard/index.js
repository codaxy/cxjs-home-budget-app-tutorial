import {HtmlElement, Section, FlexRow, Repeater, FlexCol, Text, MonthField, Tab} from 'cx/widgets';
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
    LineGraph,
} from "cx/charts";
import {Svg, Text as SvgText} from "cx/svg";
import {KeySelection, tpl, bind, expr, computable, LabelsLeftLayout} from "cx/ui";

import Controller from './Controller';
import {categoryNames, subCategoryNames} from '../../data/categories';

export default <cx>
    <h2 putInto="header">Dashboard</h2>
    <div controller={Controller} class="cxb-dashboard">
        <Section mod="card">
            <Tab tab="balance" value={bind("$page.tab")} mod="line">Balance</Tab>
            <Tab tab="expenses" value={bind("$page.tab")} mod="line">Expenses</Tab>
            <Tab tab="incomes" value={bind("$page.tab")} mod="line">Incomes</Tab>   
            <div layout={LabelsLeftLayout} style="display: inline-block;">
                <MonthField style="min-width: 192px; margin-top: 0;"
                    range 
                    label="Period" 
                    from={bind('$page.range.from')} 
                    to={bind('$page.range.to')}
                    showClear={false} />
            </div>
        </Section>
        <FlexRow wrap spacing class="cxe-dashboard-main">
            <ColorMap />
            <Section
                mod="card"
                title="Overview by Categories"
                hLevel={3}
                style="max-width: 300px;"
            >
                <FlexCol align="center" spacing>
                    <Legend.Scope>
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
                    </Legend.Scope>
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
                        minHeight: {expr: "40 + {$page.bars.length} * 25"}
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
                    <Svg style={{
                            minWidth: {expr: "40 + {$page.histogramTotal.length} * 25"},
                            height: '100%'
                        }}>
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

            <Section mod="card" header={<h3>Incomes vs Expenses</h3>} style="min-width: 274px">
                <div style="max-width: 550px;">
                    <Legend.Scope>
                    <Svg style={{
                            minWidth: {expr: "40 + {$page.incomeHistogramTotal.length} * 40"},
                            height: '100%'
                        }}>
                        <Chart
                            offset="10 -10 -55 50"
                            axes={{x: <CategoryAxis labelRotation={-45} labelOffset={5} labelAnchor="end" />, y: <NumericAxis vertical/>}}
                        >
                            <Gridlines xAxis={false}/>
                            <Repeater records={bind("$page.incomeHistogramTotal")} recordName="$point" keyField="id">
                                <Column name="Incomes"
                                    colorIndex={8}
                                    width={0.4}
                                    offset={-0.2}
                                    x={bind("$point.label")}
                                    y={bind("$point.amount")}
                                    tooltip={tpl("{$point.amount:n;2}")}
                                />
                            </Repeater>
                            <Repeater records={bind("$page.histogramTotal")} recordName="$point" keyField="id">
                                <Column name="Expenses"
                                    colorIndex={0}
                                    width={0.4}
                                    offset={0.2}
                                    x={bind("$point.label")}
                                    y={bind("$point.amount")}
                                    tooltip={tpl("{$point.amount:n;2}")}
                                />
                            </Repeater>
                        </Chart>
                    </Svg>
                    <Legend />
                    </Legend.Scope>
                    
                </div>
            </Section>

        </FlexRow>
    </div>
</cx>
