import { Controller } from 'cx/ui';
import { append } from 'cx/data';
import {zeroTime} from 'cx/util';

import {categories as expenseCategories, subCategories as expenseSubCategories, incomeCategories, incomeSubCategories} from '../../data/categories';

import uuid from 'uuid';

export default class extends Controller {
    onInit() {
        let type = this.store.get('$route.type');
        let categories, subCategories;
        if (type === 'income') {
            categories = incomeCategories
            subCategories = incomeSubCategories;
        } else {
            categories = expenseCategories
            subCategories = expenseSubCategories;
        }
       

        this.store.init('$page.categories', categories);

        this.addTrigger('entries', ['$page.activeCategoryId'], catId => {
            let data = subCategories
                .filter(a => a.catId == catId)
                .map(sc => ({
                    subCategoryId: sc.id,
                    categoryId: catId,
                    label: sc.name,
                    amount: null,
                    id: uuid()
                }));

            this.store.set('$page.entries', data);
            this.store.set('$page.date', new Date());
            this.store.delete('$page.until');
            this.store.set('$page.repeat', 'once');
        }, true)

        this.store.set('$page.occurence', [{
                occurence: 'once',
                text: "Does not repeat"
            },{
                occurence: 'daily',
                text: "Daily"
            },{
                occurence: 'weekly',
                text: "Weekly"
            },{
                occurence: 'monthly',
                text: "Monthly"
            },{
                occurence: 'yearly',
                text: "Yearly"
            }]
        );

        this.addComputable('$page.valid', ['$page.entries', '$page.repeat', '$page.until', '$page.date' ], (entries=[], repeat, until, date) => {
            return entries.some(x => x.amount > 0) && (repeat === 'once' ? true : new Date(until) > new Date(date) );
        });

    }

    selectCategory(e, {store}) {
        this.store.set('$page.activeCategoryId', store.get('$record.id'));
    }

    save() {
        let data = this.store.get('$page.entries');
        let date = this.store.get('$page.date');
        let until = this.store.get('$page.until');

        let entries = [];
        data.forEach(e => {
            if (e.amount > 0) {
                entries.push(generateEntryLog(e, date));
                if (until) {
                    let repeat = this.store.get('$page.repeat');
                    entries = entries.concat(repeatExpense(e, date, repeat, until));  
                }
            }
        });

        this.store.update('entries', append, ...entries);

        this.store.delete('$page.activeCategoryId');
    }

    addEntry(e, {store}) {
        let index = store.get('$index');
        let record = store.get('$record');

        store.update('$page.entries', (entries) => [
            ...entries.slice(0, index + 1),
            {
                ...record,
                amount: null,
                id: uuid()
            },
            ...entries.slice(index + 1)
        ]);
    }
}


function repeatExpense(expense, date, repeat, until) {
    let futureExpenses = [];
    let futureDate = zeroTime(new Date(date));
    until = zeroTime(new Date(until));
    let increment = 1, getDate, setDate;

    switch(repeat) {
        case 'daily':
            getDate = Date.prototype.getDate.bind(futureDate);
            setDate = Date.prototype.setDate.bind(futureDate);
            break;
        case 'weekly':
            increment = 7;
            getDate = Date.prototype.getDate.bind(futureDate);
            setDate = Date.prototype.setDate.bind(futureDate);
            break;
        case 'monthly':
            getDate = Date.prototype.getMonth.bind(futureDate);
            setDate = Date.prototype.setMonth.bind(futureDate);
            break;
        case 'yearly':
            getDate = Date.prototype.getFullYear.bind(futureDate);
            setDate = Date.prototype.setFullYear.bind(futureDate);
            break;
    }
    
    while (true) {
        // increase futureDate by increment
        setDate(getDate() + increment);

        if (futureDate > until)
            break;

        futureExpenses.push(generateEntryLog(expense, futureDate));
    }
    
    return futureExpenses;
}


function generateEntryLog(entry, date) {
    return {
        id: uuid(),
        subCategoryId: entry.subCategoryId,
        categoryId: entry.categoryId,
        amount: entry.amount,
        date: new Date(date).toISOString()
    }
}