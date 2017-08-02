import {HtmlElement, Section, NumberField, Repeater, Button, PureContainer} from 'cx/widgets';
import {bind, expr} from 'cx/ui';

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
        <PureContainer if={expr('{$page.entries.length} > 0')}>
            <Repeater records={bind("$page.entries")} keyField="id">
                <div>
                    <NumberField
                        value={bind("$record.amount")}
                        label={bind("$record.label")}
                        format="currency;;2"
                    />
                </div>
            </Repeater>

            <br/>

            <Button mod="primary" onClick="save">Save</Button>
        </PureContainer>
    </Section>
</cx>
