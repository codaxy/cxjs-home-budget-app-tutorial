import { Controller } from 'cx/ui';
import { categoryNames, subCategoryNames } from '../../data/categories';

export default class extends Controller {
   onInit() {
      let tab = this.store.get('$route.type');
      // get range for current year
      let currentYear = new Date().getFullYear();
      this.store.init('range', {
         from: new Date(currentYear, 0, 1).toISOString(),
         to: new Date(currentYear + 1, 0, 1).toISOString()
      });
   }
}