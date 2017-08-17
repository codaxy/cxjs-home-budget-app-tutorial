import {HtmlElement, Link, Button} from 'cx/widgets';
import {ContentPlaceholder, bind} from 'cx/ui';
import Controller from "./Controller";
import UserAccount from "./UserAccount";

export default <cx>
   <div
      controller={Controller}
      class={{
         "layout": true,
         "nav": {bind: "layout.aside.open"}
      }}
   >
      <main class="main" onMouseDownCapture="onMainClick">
         <ContentPlaceholder />
      </main>
      <header class="header">
         <i
            class={{
               hamburger: true,
               open: {bind: 'layout.aside.open'}
            }}
            onClick={(e, {store}) => {
               store.toggle('layout.aside.open');
            }}
         />
         <ContentPlaceholder name="header"/>
         <div style="flex: 1;" />
         <UserAccount />
      </header>
      <aside class="aside">
         <h1>Cx App</h1>
         <dl>
            <dt>
               Budget
            </dt>
            <dd>
               <Link href="~/dashboard" match="prefix" url={bind("url")}>
                  Dashboard
               </Link>
               <Link href="~/entry/expense" url={bind("url")}>
                  Add Expense
               </Link>
               <Link href="~/entry/income" url={bind("url")}>
                  Add Income
               </Link>
            </dd>
            <dd>
               <Link href="~/log" url={bind("url")}>
                  Log
               </Link>
               <ContentPlaceholder name="sidebar"/>
            </dd>
         </dl>
      </aside>
   </div>
</cx>
