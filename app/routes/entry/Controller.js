import { Controller } from 'cx/ui';
import { append } from 'cx/data';

import {subCategories} from '../../data/categories';

import uuid from 'uuid';

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
        }, true)


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

        let entries = [];
        data.forEach(e => {
            if (e.amount > 0) {
                entries.push({
                    id: uuid(),
                    subCategoryId: e.subCategoryId,
                    categoryId: e.categoryId,
                    amount: e.amount,
                    date: new Date()
                })
            }
        });

        this.store.update('entries', append, ...entries);

        this.store.delete('$page.activeCategoryId');
    }

    addEntry(e, {store}) {
        let entryId = store.get('$record').id;
            
        store.update('$page.entries', (entries) => {
            return entries.reduce((acc, e, i) => {
                acc.push(e);
                if (e.id === entryId)
                    acc.push({
                        subCategoryId: e.subCategoryId,
                        categoryId: e.categoryId,
                        label: e.label,
                        amount: null,
                        id: uuid()
                    });
                return acc;
            }, []);
        });
    }
}