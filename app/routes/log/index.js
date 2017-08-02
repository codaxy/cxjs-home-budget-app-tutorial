import {HtmlElement, Grid, Button} from 'cx/widgets';
import {computable} from 'cx/ui';

import Controller from './Controller';

import {categoryNames, subCategoryNames} from '../../data/categories';

import GeneratorDialog from './GeneratorDialog';

export default <cx>
    <div controller={Controller}>
        <Grid
            records:bind="entries"
            scrollable
            buffered
            style="height: 300px"
            columns={[
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
                },
                {
                    field: 'date',
                    header: 'Date',
                    format: "date",
                    sortable: true
                }
            ]}
        />

        <br/>

        <GeneratorDialog />

        <Button onClick={(e, {store}) => { store.toggle('$page.generator.visible')}}>Generate</Button>
    </div>
</cx>
