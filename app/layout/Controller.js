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

            // get active budget
            let activeBudgetId = UIState.get('activeBudgetId') || "demo";
            this.store.set('activeBudgetId', activeBudgetId);
            // load entries
            this.store.set('entries', UIState.get(activeBudgetId) || []);

            this.addTrigger('entries', ['entries'], (entries) => {
                  UIState.set('entries', entries);
                  this.sync();
            });

            this.unsubscribe = watchBudgetEntries(activeBudgetId, this.sync.bind(this))
      }

      onDestroy() {
            this.unsubscribe();
      }

      sync() {
            let entries = this.store.get('entries');
            let lastSync = UIState.get('lastSyncTimestamp') || 0;
            syncBudgetEntries('demo', entries, lastSync)
                  .then((newEntries) => {
                        console.log("Budget sync complete!");
                        UIState.set('lastSyncTimestamp', Date.now());
                        this.store.set('entries', newEntries);
                  });
      }

      onMainClick(e, { store }) {
            if (window.innerWidth < 800)
                  store.set('layout.aside.open', false);
      }
}
