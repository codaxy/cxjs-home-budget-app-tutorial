import {HtmlElement, Section, NumberField, Repeater, Button, DateField, LookupField, PureContainer, Icon, FlexRow } from 'cx/widgets';
import {bind, expr} from 'cx/ui';

import Controller from './Controller';

import {categories, subCategories} from '../../data/categories';

let today = new Date();
let occurance = [{
        id: 0,
        text: "Does not repeat"
    },{
        id: 1,
        text: "Weekly"
    },{
        id: 2,
        text: "Monthly"
    },{
        id: 3,
        text: "Yearly"
    },{
        id: 4,
        text: "Custom..."
    }];

export default <cx>
    <Section mod="card" controller={Controller} title="Add Expense">
        <Repeater records={categories}>
            <Button
                text={bind("$record.name")}
                onClick="selectCategory"
                pressed={expr("{$record.id}=={$page.activeCategoryId}")}
            />
        </Repeater>
        <PureContainer if={expr('{$page.entries.length} > 0')}>
            <Repeater records={bind("$page.entries")} keyField="id">
                <div>
                    <NumberField
                        value={bind("$record.amount")}
                        label={bind("$record.label")}
                        format="currency;;2"
                        placeholder="$"
                    />
                    <DateField label="Date" value={bind("$record.date", today)} showClear={false} />
                    <LookupField 
                        value={bind('$record.occurance', 0)} 
                        options={occurance} icon="refresh"
                        showClear={false} />
                    <Button icon="add" if={expr("{$record.amount} > 0")} onClick="addEntry" />
                </div>
            </Repeater>

            <br/>

            <Button mod="primary" onClick="save">Save</Button>
        </PureContainer>
    </Section>
</cx>
