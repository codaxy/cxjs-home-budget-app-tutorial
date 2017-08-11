import { Controller } from 'cx/ui';

import { categoryNames, subCategoryNames } from '../../data/categories';

export default class extends Controller {
    onInit() {
        let tab = this.store.get('$route.type');
        // get range for current year
        let currentYear = new Date().getFullYear();
        this.store.init('range', {
            from: new Date(currentYear, 0, 1).toISOString(),
            to: new Date(currentYear + 1, 0, 1).toISOString()
        });

        this.addComputable('$page.entries', ['entries', 'range'], (entries, range) => {
            let from = new Date(range.from);
            let to = new Date(range.to);

            return (entries || []).filter(e => {
                let date = new Date(e.date);
                if (date < from || date >= to)
                    return false;
                if (!tab.includes(e.categoryId.substring(0, 3)))
                    return false;
                return true;
            });
        });
    }
}