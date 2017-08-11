import { Controller } from 'cx/ui';

import {categoryNames, subCategoryNames} from '../../data/categories';

export default class extends Controller {
    onInit() {
        let tab = this.store.get('$route.type');
        // get range for current year
        let currentYear = new Date().getFullYear();
        this.store.init('range', {
            from: new Date(currentYear, 0, 1).toISOString(),
            to: new Date(currentYear + 1, 0, 1).toISOString()
        });

        
    }
}

// reducers
function entriesSum(entries) {
    if (entries) {
        return entries.reduce((sum, e) => sum + e.amount, 0);
    }
    return 0;
}

function toMonthly(months, e, catId) {
    let date = new Date(e.date);
    let month = date.toLocaleString('en-us', { month: "short" })
    let year = date.getFullYear();
    let id = `${month}${year}`
    let cat = months[id];
    if (cat) {
        cat.total += e.amount;
        cat.subCategory += e.categoryId === catId ? e.amount : 0;
    }
    return months;
}

// Histogram months map
function getMonthsMap(range, catId) {
    let from = new Date(range.from);
    let to = new Date(range.to);
    let months = {};
    let month = new Date(from);
    let id, numOfDays;
    while (true) {
        if(month >= to)
            break;
        let monthName = month.toLocaleString('en-us', { month: "short" })
        let year = month.getFullYear();
        let id = `${monthName}${year}`
        numOfDays = new Date(month.getFullYear(), month.getMonth()+1, 0).getDate();
        months[id] = {
            id,
            date: new Date(month),
            total: 0,
            subCategory: 0,
            width: numOfDays * 24 * 60 * 60 * 1000,
            label: `${monthName} ${year}`
        };
        if (catId) months[id].categoryName = categoryNames[catId];
        month.setMonth(month.getMonth() + 1);
    }
    return months;
}