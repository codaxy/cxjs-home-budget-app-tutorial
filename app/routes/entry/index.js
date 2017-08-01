import {HtmlElement, Section, NumberField, Repeater, Button} from 'cx/widgets';

import Controller from './Controller';

import {categories, subCategories} from '../../data/categories';

export default <cx>
    <Section mod="card" controller={Controller}>
        <Repeater records={categories}>
            <Button
                text:bind="$record.name"
                onClick="selectCategory"
                pressed:expr="{$record.id}=={$page.activeCategoryId}"
            />
        </Repeater>

        <Repeater records:bind="$page.entries">
            <div>
                <NumberField
                    value:bind="$record.amount"
                    label:bind="$record.label"
                />
            </div>
        </Repeater>

        <br/>

        <Button mod="primary" onClick="save">Save</Button>
    </Section>
</cx>
