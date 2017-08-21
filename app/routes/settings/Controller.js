import {Controller} from 'cx/ui';
import {UIState} from '../../util/UIState';

export default class extends Controller {
   onInit() {
      this.store.init('budgets', [
         {
            id: 'demo',
            name: "Home budget",
            balance: 29000
         },{
            id: 1,
            name: "Business",
            balance: -650
         }
      ]);
   }
}