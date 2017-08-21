import { Controller } from 'cx/ui';
import { categoryNames, subCategoryNames } from '../../data/categories';
import { entriesSum, toMonthly, getMonthsMap } from './util';

export default class extends Controller {
    onInit() {

        this.addTrigger('$page', ['entries', 'range'], (entries, range) => {
            let from = range.from;
            let to = range.to;
            let prevBalance = 0,
                incomesTotal = 0,
                expensesTotal = 0;

            let incomes = [], expenses = [], filteredEntries = [];
            (entries || []).forEach(e => {
                if (e.date < from) {
                    prevBalance += e.type == 'inc' ? e.amount : -e.amount;
                    return;
                }

                if (e.date >= to)
                    return;

                filteredEntries.push(e);
                
                if (e.type=='inc') {
                    incomes.push(e);
                    incomesTotal += e.amount;
                } else {
                    expenses.push(e);
                    expensesTotal += e.amount;
                }
            });
            this.store.update('$page', data => ({
                ...data,
                incomes,
                expenses,
                entries: filteredEntries,
                prevBalance,
                incomesTotal,
                expensesTotal,
                balance: prevBalance + incomesTotal - expensesTotal
            }));
        }, true);

        // BALANCE
        // Balance per day over time
        this.addComputable('$page.balanceData', ['$page.entries', '$page.prevBalance'], (entries, prevBalance) => {
            let balance = prevBalance;
            return (entries || [])
                .sort((a, b) => a.date > b.date ? 1 : -1)
                .reduce((acc, e) => {
                    balance += e.type == 'inc' ? e.amount : -e.amount;
                    acc.push({
                        date: e.date,
                        value: balance,
                    });
                    return acc;
                }, []);
        });

        // Total expenses per month over time
        this.addComputable('$page.histogram.expenses', ['$page.expenses', 'range'], (entries, range) => {
            let months = (entries || [])
                .reduce(toMonthly, getMonthsMap(range));
            return Object.keys(months).map(k => months[k]);
        });

        // Total incomes per month over time
        this.addComputable('$page.histogram.incomes', ['$page.incomes', 'range'], (entries, range) => {
            let months = (entries || [])
                .reduce(toMonthly, getMonthsMap(range));
            return Object.keys(months).map(k => months[k]);
        });
    }
}