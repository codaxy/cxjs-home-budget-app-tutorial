import { PureContainer, Section, FlexCol, Repeater, Text } from 'cx/widgets';
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
import {KeySelection, tpl, bind, expr, computable, LabelsLeftLayout} from "cx/ui";

import { categoryNames, subCategoryNames } from '../../data/categories';
import Controller from './EntriesController';

export default <cx>
    <PureContainer controller={Controller}>
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
                                        records: { bind: '$page.pie' },
                                        record: { bind: '$record' },
                                        index: { bind: '$index' },
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
                    <Legend />
                </Legend.Scope>
            </FlexCol>
        </Section>

        <Section
            mod="card"
            title={computable('$page.selectedCatId', catId => categoryNames[catId] || 'All')}
            hLevel={3}
            style="max-height: 400px"
        >
            <div>
                <Svg style={{
                    width: "100%",
                    minHeight: { expr: "40 + {$page.bars.length} * 25" }
                }}>
                    <Chart offset="20 -20 -20 130" axes={{
                        x: { type: NumericAxis, snapToTicks: 0 },
                        y: {
                            type: CategoryAxis,
                            vertical: true,
                            snapToTicks: 1,
                            inverted: true,
                            names: subCategoryNames
                        }
                    }}>
                        <Gridlines yAxis={false} />
                        <Repeater
                            records={bind("$page.bars")}
                            recordName="$point"
                            sorters={[{ field: 'amount', direction: 'DESC' }]}
                        >
                            <Bar
                                size={0.8}
                                x={bind("$point.amount")}
                                y={bind("$point.id")}
                                tooltip={tpl("{$point.amount:n;2}")}
                                colorName={bind("$point.categoryName")}
                                colorMap="pie" />
                        </Repeater>
                    </Chart>
                </Svg>
            </div>
        </Section>

        <Section mod="card"
            title="Monthly overview"
            hLevel={3}
            style="min-width: 274px"
        //footer={<Button>See logs</Button>}
        >
            <FlexCol >
                <Svg style={{
                    minWidth: { expr: "40 + {$page.histogram.length} * 25" },
                    height: '100%'
                }}>
                    <Chart
                        offset="10 -10 -20 50"
                        axes={{ x: <TimeAxis />, y: <NumericAxis vertical /> }}
                    >
                        <Gridlines xAxis={false} />
                        <Repeater records={bind("$page.histogram")} recordName="$point" keyField="id">
                            <Column
                                width={bind('$point.width')}
                                offset={expr("{$point.width}/2")}
                                x={bind("$point.date")}
                                y={bind("$point.total")}
                                tooltip={tpl("{$point.total:n;2}")}
                            />
                        </Repeater>
                        <Repeater records={bind("$page.histogram")} recordName="$point" keyField="id">
                            <Column
                                width={bind('$point.width')}
                                offset={expr("{$point.width}/2")}
                                x={bind("$point.date")}
                                y={bind("$point.subCategory")}
                                tooltip={tpl("{$point.subCategory:n;2}")}
                                colorName={bind("$point.categoryName")}
                                colorMap="pie" />
                        </Repeater>
                    </Chart>
                </Svg>
            </FlexCol>
        </Section>

        <Section mod="card"
            title="Total"
            hLevel={3}>
            <div class="kpi-main">
                <div>Expenses</div>
                <div class="kpi-value">
                    <Text tpl='${$page.total:n;2}' />
                </div>
                <div style="margin-top: 20px;">Incomes</div>
                <div class="kpi-value">
                    <Text tpl='${$page.incomesTotal:n;2}' />
                </div>
                <div style="margin-top: 20px;">Balance</div>
                <div class="kpi-value">
                    <Text tpl='${$page.balance:n;2}' />
                </div>
            </div>
        </Section>
    </PureContainer>
</cx>