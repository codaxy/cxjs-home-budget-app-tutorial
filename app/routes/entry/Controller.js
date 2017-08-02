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
                }));

            this.store.set('$page.entries', data);
        }, true)
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
}