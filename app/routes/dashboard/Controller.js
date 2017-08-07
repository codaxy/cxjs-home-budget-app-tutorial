import { Controller } from 'cx/ui';

import {categoryNames, subCategoryNames} from '../../data/categories';

export default class extends Controller {
    onInit() {
        this.store.init('$page.selectedCatId', 'cat1');
        this.store.init('$page.range', { from: new Date('2017-01-01'), to: new Date('2017-12-01') })

        this.addComputable('$page.entries', ['entries', '$page.range'], (entries, range) => {
            let from = new Date(range.from);
            let to = new Date(range.to);
            return (entries || []).filter(e => {
                    let date = new Date(e.date);
                    return from <= date && date <= to;
                });
        });

        this.addComputable('$page.pie', ['$page.entries'], entries => {
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


        this.addComputable('$page.expensesTotal', ['$page.entries'], entries => {
            let category = {};
            if (entries) {
                return entries.reduce((sum, e) => sum + e.amount, 0);
            }
            return 0;
        });

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
            // TODO: use Repeater sorters instead
            return Object.keys(subcats).map(k => subcats[k]).sort((a,b) => a.amount-b.amount);
        });

        // Expenses over time
        this.addComputable('$page.histogram', ['$page.entries', '$page.selectedCatId', '$page.range'], (entries, catId, range) => {
            let from = new Date(range.from);
            let to = new Date(range.to);
            let months = {};
            let month = new Date(from);
            let id, numOfDays;
            while (true) {
                if(month > to)
                    break;
                id = month.toLocaleString('en-us', { month: "short" }) + month.getFullYear();
                numOfDays = new Date(month.getFullYear(), month.getMonth()+1, 0).getDate();
                months[id] = {
                    id,
                    date: new Date(month),
                    amount: 0,
                    width: numOfDays * 24 * 60 * 60 * 1000,
                    categoryName: categoryNames[catId]
                } 
                month.setMonth(month.getMonth() + 1);
            }

            months = (entries || [])
                .filter(e => catId ? e.categoryId === catId : true)
                .reduce((months, e) => {
                    let date = new Date(e.date);
                    let month = date.toLocaleString('en-us', { month: "short" })
                    let year = date.getFullYear();
                    let id = `${month}${year}`
                    let cat = months[id];
                    cat.amount += e.amount;
                    return months;
                }, months);
            return Object.keys(months).map(k => months[k]);
        });
    }
}