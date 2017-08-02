import {HtmlElement, Window, MonthField, NumberField, Button} from 'cx/widgets';
import {computable, LabelsTopLayout} from 'cx/ui';

import {subCategories} from '../../data/categories';

const generate = (e, {store}) => {
    let {from, to, amount} = store.get('$page.generator');

    let fromDate = Date.parse(from), toDate = Date.parse(to);

    let N = amount / 100;

    let newEntries = [];

    for (let i = 0; i < N; i++) {
        let subCategory = subCategories[Math.floor(Math.random() * subCategories.length)];
        newEntries.push({
            subCategoryId: subCategory.id,
            categoryId: subCategory.catId,
            amount: Number((100 * (0.5 + Math.random())).toFixed(2)),
            date: new Date(fromDate + Math.random() * (toDate - fromDate)).toISOString()
        })
    }

    store.update('entries', entries => [...entries, ...newEntries]);
};

const clear = (e, {store}) => {
    store.set('entries', []);
}

export default <cx>
    <Window
        title="Random Data Generator"
        visible:bind="$page.generator.visible"
        bodyStyle="padding: 20px"

    >
        <div layout={{type: LabelsTopLayout, vertical: true, mod: 'stretch'}}>
            <MonthField
                label="Period"
                range
                from:bind="$page.generator.from"
                to:bind="$page.generator.to"
                required
                style="width: 100%;"
            />

            <NumberField
                label="Amount"
                value:bind="$page.generator.amount"
                required
                style="width: 100%;"
            />
        </div>

        <div putInto="footer">
            <Button onClick={generate}>Generate</Button>
            <Button onClick={clear}>Clear</Button>
        </div>
    </Window>
</cx>
