import {HtmlElement, Section, FlexRow, MonthField, LinkButton} from 'cx/widgets';
import { bind } from "cx/ui";
import Controller from './Controller';
import Entries from './Entries';

export default <cx>
    <h2 putInto="header">Dashboard</h2>
    <div class="cxb-dashboard" controller={Controller}>
        <Section mod="card">
            <FlexRow>
            <LinkButton
                mod="hollow"
                href={"~/dashboard/balance"}
                url={{bind: "url"}}
                text="Balance"
            />
            <LinkButton
                mod="hollow"
                href={"~/dashboard/expenses"}
                url={{bind: "url"}}
                text="Expenses"
            />
            <LinkButton
                mod="hollow"
                href={"~/dashboard/incomes"}
                url={{bind: "url"}}
                text="Incomes"
            />
            <MonthField style="min-width: 192px; vertical-align: top; margin-left: auto"
                range
                placeholder="Period"
                labelPlacement={null}
                from={bind('range.from')}
                to={bind('range.to')}
                showClear={false}/>
            </FlexRow>
        </Section>
        <FlexRow wrap spacing class="cxe-dashboard-main">
            <Entries />
        </FlexRow>
    </div>
</cx>
