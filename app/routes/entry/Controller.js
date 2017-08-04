import { Controller } from 'cx/ui';
import { append } from 'cx/data';

import {subCategories} from '../../data/categories';

import uuid from 'uuid';

function repeat(expense, repeat, until) {
    // TODO
    return [];
}

export default class extends Controller {
    onInit() {
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

        this.addComputable('$page.valid', ['$page.entries', '$page.repeat', '$page.until' ], (entries=[], repeat=0, until=null) => {
            return entries.some(x => x.amount > 0) && (repeat === 'once' ? true : !!until );
        });

        // this.addTrigger('additional-entry-field', ['$page.entries'], entries => {
        //     let newEntries = entries;
        //
        //     for (let i = 0; i < newEntries.length; i++) {
        //         let e = newEntries[i];
        //         let next = newEntries[i + 1] || {};
        //         if (e.amount > 0 && next.subCategoryId != e.subCategoryId) {
        //             newEntries = [
        //                 ...newEntries.slice(0, i + 1),
        //                 {
        //                     subCategoryId: e.subCategoryId,
        //                     categoryId: e.categoryId,
        //                     label: e.label,
        //                     amount: null,
        //                     id: uuid()
        //                 },
        //                 ...newEntries.slice(i + 1)
        //             ]
        //         }
        //     }
        //
        //     this.store.set("$page.entries", newEntries);
        // })
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
                entries.push({
                    id: uuid(),
                    subCategoryId: e.subCategoryId,
                    categoryId: e.categoryId,
                    amount: e.amount,
                    date
                });
                if (until) {
                    let repeat = this.store.get('$page.repeat');
                    entries.concat(repeat(e, repeat, until));  
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