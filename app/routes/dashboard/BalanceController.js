import { Controller } from 'cx/ui';
import { categoryNames, subCategoryNames } from '../../data/categories';
import { entriesSum, toMonthly, getMonthsMap } from './util';

export default class extends Controller {
    onInit() {

        this.addTrigger('$page', ['entries', 'range'], (entries, range) => {
            let from = new Date(range.from);
            let to = new Date(range.to);

            let incomes = [], expenses = [], filteredEntries = [];
            (entries || []).forEach(e => {
                let date = new Date(e.date);
                if (date < from || date >= to)
                    return;
                filteredEntries.push(e);
                if (e.categoryId.includes('inc'))
                    incomes.push(e);
                else expenses.push(e);
            });
            this.store.update('$page', data => {
                data = {...data}
                data.incomes = incomes;
                data.expenses = expenses;
                data.entries = filteredEntries;
                return data;
            });
        }, true);

        // get totals 
        this.addComputable('$page.expensesTotal', ['$page.expenses'], entriesSum);
        this.addComputable('$page.incomesTotal', ['$page.incomes'], entriesSum);

        // BALANCE
        // Balance per day over time
        this.addComputable('$page.balanceData', ['entries', 'range'], (entries, range) => {
            let { from, to } = range;
            return (entries || [])
                .sort((a, b) => a.date > b.date ? 1 : -1)
                .reduce((acc, e) => {
                    let length = acc.length
                    let balance = length > 0 ? acc[length - 1].value : 0;
                    let incr = e.categoryId.includes('exp') ? -e.amount : e.amount;
                    balance += incr;
                    acc.push({
                        date: e.date,
                        value: balance,
                    });
                    return acc;
                }, [])
                .filter(e => e.date >= from && e.date < to);
        });

        this.addComputable('$page.balance', ['$page.balanceData'], balanceData => {
            // get current balance
            let balance = balanceData.slice(-1).pop();
            return (balance && balance.value) ? balance.value : 0;
        });

        this.addComputable('$page.prevBalance', ['$page.balance', '$page.incomesTotal', '$page.expensesTotal'], 
            (balance, incomesTotal, expensesTotal) => {
                return balance - incomesTotal + expensesTotal
            });
    }
}