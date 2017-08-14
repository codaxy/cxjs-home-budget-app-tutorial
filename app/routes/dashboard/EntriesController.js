import { Controller } from 'cx/ui';
import { categoryNames, subCategoryNames } from '../../data/categories';
import { entriesSum, toMonthly, getMonthsMap } from './util';

export default class extends Controller {
    onInit() {

        this.addComputable('$page.entries', ['entries', 'range'], (entries, range) => {
            let from = new Date(range.from);
            let to = new Date(range.to);
            let category = this.store.get('$route.type');

            return (entries || []).filter(e => {
                let date = new Date(e.date);
                if (date < from || date >= to)
                    return false;
                if (!category.includes(e.categoryId.substring(0, 3)))
                    return false;
                return true;
            });
        });

        this.addComputable('$page.pie', ['$page.entries'], (entries) => {
            let category = {};
            if (entries) {
                entries.forEach(e => {
                    let cat = category[e.categoryId];
                    if (!cat)
                        cat = category[e.categoryId] = {
                            id: e.categoryId,
                            name: categoryNames[e.categoryId],
                            amount: 0
                        };
                    cat.amount += e.amount;
                });
            }
            return Object.keys(category).map(k => category[k]);
        });

        // get total amount
        this.addComputable('$page.total', ['$page.entries'], entriesSum);

        // Expenses per subcategory
        this.addComputable('$page.bars', ['$page.entries', '$page.selectedCatId'], (entries, catId) => {
            let subcats = (entries || [])
                .filter(e => catId ? e.categoryId === catId : true)
                .reduce((subcats, e) => {
                    let cat = subcats[e.subCategoryId];
                    if (!cat)
                        cat = subcats[e.subCategoryId] = {
                            id: e.subCategoryId,
                            name: subCategoryNames[e.subCategoryId],
                            categoryName: categoryNames[e.categoryId],
                            amount: 0
                        };
                    cat.amount += e.amount;
                    return subcats;
                }, {});

            return Object.keys(subcats).map(k => subcats[k]);
        });

        // Expenses per month over time
        this.addComputable('$page.histogram', ['$page.entries', '$page.selectedCatId', 'range'], (entries, catId, range) => {
            let months = (entries || [])
                .reduce((monthsMap, e) => toMonthly(monthsMap, e, catId), getMonthsMap(range, catId));
            return Object.keys(months).map(k => months[k]);
        });
    }
}

