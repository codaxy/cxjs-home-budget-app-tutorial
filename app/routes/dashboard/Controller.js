import { Controller } from 'cx/ui';

import {categoryNames, subCategoryNames} from '../../data/categories';

export default class extends Controller {
    onInit() {
        this.store.init('bars', [
            {
                "day": "Mo",
                "value": 500,
                "colorIndex": 12
            },
            {
                "day": "Tu",
                "value": 900,
                "colorIndex": 9
            },
            {
                "day": "We",
                "value": 850,
                "colorIndex": 10
            },
            {
                "day": "Th",
                "value": 950,
                "colorIndex": 9
            },
            {
                "day": "Fr",
                "value": 1000,
                "colorIndex": 8
            }
        ]);

        this.addComputable('$page.pie', ['entries'], entries => {
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


        this.addComputable('$page.expensesTotal', ['entries'], entries => {
            let category = {};
            if (entries) {
                return entries.reduce((sum, e) => sum + e.amount, 0);
            }
            return 0;
        });

        // Expenses per subcategory
        this.addComputable('$page.bars', ['entries', '$page.selectedCatId'], (entries, catId) => {
            let subcats = {};
            subcats = (entries || []).reduce((subcats, e) => {
                if (catId && e.categoryId !== catId)
                    return subcats;
                let cat = subcats[e.subCategoryId];
                if (!cat)
                    cat = subcats[e.subCategoryId] = {
                        id: e.subCategoryId,
                        name: subCategoryNames[e.subCategoryId],
                        amount: 0
                    };
                cat.amount += e.amount;
                return subcats;
            }, {});
            return Object.keys(subcats).map(k => subcats[k]);
        });
    }
}