import { Controller } from 'cx/ui';
import { UIState } from '../../util/UIState';
import uuid from 'uuid';

export default class extends Controller {
   onInit() {
      
      this.addTrigger('activeBudget', ['$page.activeBudgetId'], id => {
         let budgets = this.store.get('budgets');
         this.store.set('activeBudget', budgets.find(v => v.id === id));
      })

   }

   onNewBudget() {
      let name = this.store.get('$page.budgetName');
      let budgets = this.store.get('budgets');
      let newBudget = {
         id: uuid(),
         name,
         balance: 0
      };
      budgets = [...budgets, newBudget]
      
      this.store.set('budgets', budgets);
      this.store.set('activeBudget', newBudget);
      this.store.delete('$page.activeBudgetId');
      this.store.delete('$page.budgetName');
   }

   onDeleteBudget() {
      let activeBudget = this.store.get('activeBudget');
      let budgets = this.store.get('budgets');
      budgets = budgets.filter(b => b.id !== activeBudget.id)
      this.store.set('budgets', budgets);

      this.store.delete('activeBudget');
      this.store.delete('$page.activeBudgetId');
      this.store.delete('entries');
   }
}