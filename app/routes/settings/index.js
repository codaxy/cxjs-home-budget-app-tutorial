import { HtmlElement, Link, Section, FlexCol, FlexRow, Button, Grid, Repeater, Radio, TextField } from 'cx/widgets';
import { Chart, Gridlines, Column, Legend, CategoryAxis, NumericAxis } from 'cx/charts';
import { Svg } from 'cx/svg';
import { bind, tpl, expr, KeySelection } from 'cx/ui';
import Controller from './Controller';

export default <cx>
    <h2 putInto="header">
        Settings
    </h2>
    <FlexCol spacing='large' controller={Controller}>
        <Section mod="card" >
            <TextField placeholder="Budget name" value={bind('$page.budgetName')} />
            <Button mod="hollow" icon="add" onClick="onNewBudget">Add budget</Button>
            <Button mod="hollow" icon="delete" 
                onClick="onDeleteBudget"
                disabled={expr("!{$page.activeBudgetId}")}>
                Delete budget
            </Button>
        </Section>
        <FlexRow spacing='large'>
            <Section mod="card" title="Budgets">
                <Grid records={bind('budgets')}
                    border={true}
                    scrollable
                    emptyText="No data."
                    style="width: 450px;"
                    columns={[
                        {   
                            header: "Active",
                            items: <cx><Radio value={bind("activeBudget")} option={bind('$record')} /></cx>
                        },
                        { header: "Budget name", field: 'name', sortable: true },
                        { header: 'Balance', field: 'balance', format: 'currency;;2', sortable: true },
                        { header: 'Last update', field: 'lastSyncTimestamp', format: 'datetime;|N/A', sortable: true }
                    ]}
                    selection={{type: KeySelection, bind:'$page.activeBudgetId'}}
                />
            </Section>
            <Section mod="card" title="Balances">
                <Svg style={{
                        maxWidth: expr('{budgets.length} * 120'),
                        height: 400
                    }}>
                    <Chart offset="20 -20 -100 50" axes={{
                        x: { type: CategoryAxis, labelRotation: -45, labelDy: '0.4em', labelAnchor: "end" },
                        y: { type: NumericAxis, vertical: true }
                    }}>
                        <Gridlines xAxis={false}/>
                        <Repeater records={bind("budgets")} recordName="$point">
                            <Column colorIndex={expr("{$point.balance} >= 0 ? 7 : 0")}
                                width={0.6}
                                x={bind("$point.name")}
                                y={bind("$point.balance")}
                                tooltip={tpl("{$point.balance:currency;USD;2}")} />
                        </Repeater>
                    </Chart>
                </Svg>
                <Legend />
            </Section>
        </FlexRow>
    </FlexCol>
</cx >
