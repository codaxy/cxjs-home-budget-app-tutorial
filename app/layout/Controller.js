import {Controller} from 'cx/ui';
import {UIState} from '../util/UIState';

export default class extends Controller {
   onInit() {
      this.store.init("layout.aside.open", window.innerWidth >= 800);

      this.addTrigger('navigation', ['url'], () => {
         if (window.innerWidth < 800)
            this.store.set('layout.aside.open', false);
      });

      // load entries
      this.store.set('entries', UIState.get('entries') || []);
      
      this.addTrigger('entries', ['entries'], (entries) => {
         UIState.set('entries', entries);
      });
   }

   onMainClick(e, {store}) {
      if (window.innerWidth < 800)
         store.set('layout.aside.open', false);
   }
}
