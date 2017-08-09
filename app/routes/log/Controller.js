import { Controller } from 'cx/ui';

import { subCategories } from '../../data/categories';
import uuid from 'uuid';

const expenseSubCategories = subCategories.filter(s => s.catId.includes('exp'));

export default class extends Controller {
    onInit(){

    }

    generate(e, {store}){
        let {from, to, amount} = store.get('$page.generator');

        let fromDate = Date.parse(from), toDate = Date.parse(to);

        let N = amount / 100;

        let newEntries = [];

        for (let i = 0; i < N; i++) {
            let subCategory = expenseSubCategories[Math.floor(Math.random() * expenseSubCategories.length)];
            newEntries.push({
                subCategoryId: subCategory.id,
                categoryId: subCategory.catId,
                amount: Number((100 * (0.5 + Math.random())).toFixed(2)),
                date: new Date(fromDate + Math.random() * (toDate - fromDate)).toISOString()
            })
        }

        store.update('entries', entries => [...entries, ...newEntries]);
    };

    clear(e, {store}) {
        store.set('entries', []);
    }
}