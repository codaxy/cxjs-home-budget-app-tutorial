import { PureContainer, Section, Repeater, Text } from 'cx/widgets';
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

import { Svg, Text as SvgText } from "cx/svg";
import { KeySelection, tpl, bind, expr, computable, LabelsLeftLayout } from "cx/ui";

import { categoryNames, subCategoryNames } from '../../data/categories';
import Controller from './BalanceController';

export default () => <cx>
    <PureContainer controller={Controller} >
        <Section mod="card"
            title="Balance"
            hLevel={3}>

            <div>Previous balance</div>
            <div class="kpi-value">
                <Text tpl='${$page.prevBalance:n;2}' />
            </div>
            <div style="margin-top: 20px;">Incomes</div>
            <div class="kpi-value">
                <Text tpl='${$page.incomesTotal:n;2}' />
            </div>
            <div style="margin-top: 20px;">Expenses</div>
            <div class="kpi-value">
                <Text tpl='${$page.expensesTotal:n;2}' />
            </div>
            <div style="margin-top: 20px;">Current balance</div>
            <div class="kpi-value">
                <Text tpl='${$page.balance:n;2}' />
            </div>

        </Section>

        <Section mod="card"
            title="Balance"
            hLevel={3}>
            <div style="width: 450px; height: 300px;">
                <Svg style="width: 100%;">
                    <Chart offset="20 -20 -20 50" axes={{ x: { type: TimeAxis }, y: { type: NumericAxis, vertical: true } }}>
                        <Gridlines />
                        <LineGraph
                            data={bind('$page.balanceData')}
                            xField='date'
                            yField='value'
                            colorIndex={expr("{$page.balance} > 0 ? 7 : 0")}
                            area
                        />
                    </Chart>
                </Svg>
            </div>
        </Section>

        <Section mod="card"
            title="Incomes vs Expenses"
            hLevel={3}
            style="min-width: 274px">
            <div style="max-width: 550px;">
                <Legend.Scope>
                    <Svg style={{
                        minWidth: { expr: "40 + {$page.histogram.incomes.length} * 40" },
                        height: '100%'
                    }}>
                        <Chart
                            offset="10 -10 -55 50"
                            axes={{ x: <CategoryAxis labelRotation={-45} labelOffset={5} labelAnchor="end" />, y: <NumericAxis vertical /> }}
                        >
                            <Gridlines xAxis={false} />
                            <Repeater records={bind("$page.histogram.incomes")} recordName="$point" keyField="id">
                                <Column name="Incomes"
                                    colorIndex={8}
                                    width={0.4}
                                    offset={-0.2}
                                    x={bind("$point.label")}
                                    y={bind("$point.total")}
                                    tooltip={tpl("{$point.total:n;2}")}
                                />
                            </Repeater>
                            <Repeater records={bind("$page.histogram.expenses")} recordName="$point" keyField="id">
                                <Column name="Expenses"
                                    colorIndex={0}
                                    width={0.4}
                                    offset={0.2}
                                    x={bind("$point.label")}
                                    y={expr("{$point.total}")}
                                    tooltip={tpl("{$point.total:n;2}")}
                                />
                            </Repeater>
                        </Chart>
                    </Svg>
                    <Legend />
                </Legend.Scope>
            </div>
        </Section>
    </PureContainer>
</cx>