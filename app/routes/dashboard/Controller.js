import { Controller } from 'cx/ui';

import {categoryNames} from '../../data/categories';

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
        })
    }
}