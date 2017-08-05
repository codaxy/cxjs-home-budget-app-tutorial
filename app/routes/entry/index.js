import {
    HtmlElement,
    Section,
    NumberField,
    Repeater,
    Button,
    DateField,
    LookupField,
    PureContainer,
    Icon,
    FlexRow,
    FlexCol
} from 'cx/widgets';
import {bind, expr, LabelsTopLayout} from 'cx/ui';

import Controller from './Controller';

import {categories, subCategories} from '../../data/categories';

export default <cx>
    <Section mod="card" controller={Controller} title="Add Expense">
        <Repeater records={categories}>
            <Button
                text={bind("$record.name")}
                onClick="selectCategory"
                pressed={expr("{$record.id}=={$page.activeCategoryId}")}
            />
        </Repeater>
        <FlexCol if={expr('{$page.entries.length} > 0')}>
            <DateField label="Date" value={bind("$page.date")} showClear={false}/>
            <FlexRow wrap spacing="large" style="max-width: 400px">
                <Repeater records={bind("$page.entries")} keyField="id">
                    <div>
                        <NumberField
                            value={bind("$record.amount")}
                            label={bind("$record.label")}
                            format="currency;;2"
                            placeholder="$"
                        />
                        <Button icon="add" mod="hollow" if={expr("{$record.amount} > 0")} onClick="addEntry"/>
                    </div>
                </Repeater>
            </FlexRow>
            <FlexRow wrap spacing="large" style="max-width: 400px">
                <div>
                    <LookupField
                        label="Occurence"
                        value={bind('$page.repeat', 0)}
                        optionIdField="occurence"
                        options={bind('$page.occurence')} icon="refresh"
                        showClear={false}/>
                </div>
                <div>
                    <DateField if={expr('{$page.repeat} !== "once"')}
                        label="Until"
                        value={bind('$page.until')}
                        minValue={bind('$page.date')}
                        minExclusive
                        showClear={false}/>
                </div>
            </FlexRow>
            <br/>
            <Button mod="primary"
                style="align-self: flex-start;"
                onClick="save"
                disabled={expr('!{$page.valid}')}
                text="Save"/>
        </FlexCol>
    </Section>
</cx>
