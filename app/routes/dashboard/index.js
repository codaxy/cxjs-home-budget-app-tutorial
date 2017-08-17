import { HtmlElement, Section, FlexRow, MonthField, LinkButton, Button, Route, RedirectRoute } from 'cx/widgets';
import { bind, expr, FirstVisibleChildLayout } from "cx/ui";
import Controller from './Controller';
import Entries from './Entries';
import Balance from './Balance';

export default <cx>
    <Route route="~/dashboard(*splat)" url={bind("url")}>
    <RedirectRoute route="~/dashboard" url={bind("url")} redirect="~/dashboard/balance" />
    <h2 putInto="header">Dashboard</h2>
    <div class="cxb-dashboard" controller={Controller}>
        <Section mod="card">
            <FlexRow>
                <LinkButton
                    mod="hollow"
                    href={"~/dashboard/balance"}
                    url={{ bind: "url" }}
                    text="Balance"
                />
                <LinkButton
                    mod="hollow"
                    href={"~/dashboard/expenses"}
                    url={{ bind: "url" }}
                    text="Expenses"
                />
                <LinkButton
                    mod="hollow"
                    href={"~/dashboard/incomes"}
                    url={{ bind: "url" }}
                    text="Incomes"
                />
                <div style="flex: 1;" />
                <Button 
                    mod='hollow'
                    text="Show all subcategories"
                    if={expr('{$route.type} !== "balance"')}
                    onClick='clearSelection'
                    disabled={expr("!{$page.selectedCatId}")} />
                <MonthField style="min-width: 192px; vertical-align: top;"
                    range
                    placeholder="Period"
                    labelPlacement={null}
                    from={bind('range.from')}
                    to={bind('range.to')}
                    showClear={false} />
            </FlexRow>
        </Section>
        <FlexRow wrap spacing class="cxe-dashboard-main" layout={FirstVisibleChildLayout}>
            <Balance if={expr("{$route.type} === 'balance'")} />
            <Entries />
        </FlexRow>
    </div>
    </Route>
</cx>
