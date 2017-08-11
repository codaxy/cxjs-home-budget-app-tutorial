import { Controller } from 'cx/ui';

import {categoryNames, subCategoryNames} from '../../data/categories';

export default class extends Controller {
    onInit() {
        let tab = this.store.get('$route.type');
        // get range for current year
        let currentYear = new Date().getFullYear();
        this.store.init('$page.range', {
            from: new Date(`${currentYear}-01-01`).toISOString(),
            to: new Date(`${currentYear+1}-01-01`).toISOString()
        });

        this.store.init('$page.tab', tab);

        this.addTrigger('entries', ['entries', '$page.range'], (entries, range) => {
            let from = new Date(range.from);
            let to = new Date(range.to);

            let incomes = [], expenses = [], filteredEntries = [];

            (entries || []).forEach(e => {
                let date = new Date(e.date);
                if (date < from || date >= to)
                    return;
                if (e.categoryId.includes('exp'))
                    expenses.push(e);
                else incomes.push(e);
                filteredEntries.push(e);
            });

            this.store.set('$page.incomes', incomes);
            this.store.set('$page.expenses', expenses);
            this.store.set('$page.entries', filteredEntries);
        }, true);

        this.addComputable('$page.pie', ['$page.expenses', '$page.incomes', '$page.tab'], (expenses, incomes, tab) => {
            let entries = tab === "incomes" ? incomes : expenses;
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

        // get total incomes and expenses
        this.addComputable('$page.incomesTotal', ['$page.incomes'], entriesSum);
        this.addComputable('$page.expensesTotal', ['$page.expenses'], entriesSum);
        
        // Expenses per subcategory
        this.addComputable('$page.bars', ['$page.expenses', '$page.incomes', '$page.selectedCatId', '$page.tab'], (expenses, incomes, catId, tab) => {
            let entries = tab === "incomes" ? incomes : expenses;
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

        // Total expenses per month over time
        this.addComputable('$page.histogramTotal', ['$page.expenses', '$page.range'], (entries, range) => {
            let months = (entries || [])
                .reduce(toMonthly, getMonthsMap(range));
            return Object.keys(months).map(k => months[k]);
        });

        // Expenses per month over time
        this.addComputable('$page.histogram', ['$page.expenses', '$page.selectedCatId', '$page.range'], (entries, catId, range) => {
            let months = (entries || [])
                .filter(e => e.categoryId === catId)
                .reduce(toMonthly, getMonthsMap(range, catId));
            return Object.keys(months).map(k => months[k]);
        });

        // Total incomes per month over time
        this.addComputable('$page.incomeHistogramTotal', ['$page.incomes', '$page.range'], (entries, range) => {
            let months = (entries || [])
                .reduce(toMonthly, getMonthsMap(range));
            return Object.keys(months).map(k => months[k]);
        });

        // Balance per day over time
        this.addTrigger('balanceData', ['entries', '$page.range'], (entries, range) => {
            let {from, to} = range;
            let balanceData = [...(entries || [])]
                .sort((a,b) => a.date > b.date ? 1 : -1)
                .reduce((acc, e) => {
                    let length = acc.length
                    let balance = length > 0 ? acc[length-1].value : 0; 
                    let incr = e.categoryId.includes('exp') ? -e.amount : e.amount;
                    balance += incr;
                    acc.push({ 
                        date: e.date, 
                        value: balance
                    });
                    return acc;
                }, [])
                .filter(e => e.date >= from && e.date < to);
                
            let balance = balanceData.length > 0 ? balanceData[balanceData.length-1].value : 0;

            this.store.set('$page.balanceData', balanceData);
            this.store.set('$page.balance', balance);
        }, true);
    }
}

// reducers
function entriesSum(entries) {
    let category = {};
    if (entries) {
        return entries.reduce((sum, e) => sum + e.amount, 0);
    }
    return 0;
}

function toMonthly(months, e) {
    let date = new Date(e.date);
    let month = date.toLocaleString('en-us', { month: "short" })
    let year = date.getFullYear();
    let id = `${month}${year}`
    let cat = months[id];
    if (cat)
        cat.amount += e.amount;
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
            amount: 0,
            width: numOfDays * 24 * 60 * 60 * 1000,
            label: `${monthName} ${year}`
        };
        if (catId) months[id].categoryName = categoryNames[catId];
        month.setMonth(month.getMonth() + 1);
    }

    return months;
}