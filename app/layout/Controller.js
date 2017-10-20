import { Controller } from 'cx/ui';
import { UIState } from '../util/UIState';
import { syncBudgetEntries, watchBudgetEntries } from '../api/syncBudgetEntries';

export default class extends Controller {
    onInit() {
        this.store.init("layout.aside.open", window.innerWidth >= 800);

        this.addTrigger('navigation', ['url'], () => {
            if (window.innerWidth < 800)
                this.store.set('layout.aside.open', false);
        });

        // get budgets
        let budgets = UIState.get('budgets') || [];
        this.store.init('budgets', budgets);

        this.addTrigger('budgets', ['budgets'], budgets => {
            UIState.set('budgets', budgets);
        });

        // get active budget
        let activeBudget = UIState.get('activeBudget');
        this.store.set('activeBudget', activeBudget);

        this.addTrigger('activeBudget', ['activeBudget.id'], activeBudgetId => {
            //

            if (this.unsubscribe)
                this.unsubscribe();

            if (!activeBudgetId)
                return;
            
            // load entries
            this.store.set('entries', UIState.get(activeBudgetId) || []);
            this.unsubscribe = watchBudgetEntries(activeBudgetId, ::this.sync);
        }, true);

        this.addTrigger('saveActiveBudget', ['activeBudget'], activeBudget => {
            UIState.set('activeBudget', activeBudget);
        });

        this.addTrigger('entries', ['entries'], (entries) => {
            const activeBudget = this.store.get('activeBudget');
            if (!activeBudget)
                return;
            UIState.set(activeBudget.id, entries);
            this.sync();
        });
    }

    onDestroy() {
        if (this.unsubscribe)
            this.unsubscribe();
    }

    sync() {
        let budget = this.store.get('activeBudget');
        let entries = this.store.get('entries');
        let lastSync = budget.lastSyncTimestamp || 0;
        syncBudgetEntries(budget.id, entries, lastSync)
            .then((newEntries) => {
                console.log("Budget sync complete!");
                this.store.set('activeBudget.lastSyncTimestamp', Date.now());
                this.store.set('entries', newEntries);
            });
    }

    onMainClick(e, { store }) {
        if (window.innerWidth < 800)
            store.set('layout.aside.open', false);
    }
}
