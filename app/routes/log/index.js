import {HtmlElement, Grid, Button, Section} from 'cx/widgets';
import {computable, bind} from 'cx/ui';

import Controller from './Controller';

import {categoryNames, subCategoryNames} from '../../data/categories';

import GeneratorDialog from './GeneratorDialog';

export default <cx>
    <Section mod="card" div controller={Controller}>
        <Grid
            records:bind="entries"
            scrollable
            buffered
            style="height: 300px"
            columns={[
                {
                    field: 'date',
                    header: 'Date',
                    format: 'date',
                    sortable: true,
                    value: bind("$record.date")
                },
                {
                    field: 'categoryId',
                    header: 'Category',
                    sortable: true,
                    value: computable("$record.categoryId", id => categoryNames[id])
                },
                {
                    field: 'subCategoryId',
                    header: 'Subcategory',
                    sortable: true,
                    value: computable("$record.subCategoryId", id => subCategoryNames[id])
                },
                {
                    field: 'amount',
                    header: 'Amount',
                    format: "currency",
                    sortable: true
                }
            ]}
        />

        <br/>

        <GeneratorDialog />

        <Button onClick={(e, {store}) => { store.toggle('$page.generator.visible')}}>Generate</Button>
    </Section>
</cx>
