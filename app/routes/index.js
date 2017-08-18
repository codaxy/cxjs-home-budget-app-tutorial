import { Route, PureContainer, Section, Sandbox } from 'cx/widgets';
import { FirstVisibleChildLayout, bind, expr } from 'cx/ui'

import AppLayout from '../layout';

import Default from './default';
import Settings from './settings';
import Dashboard from './dashboard';
import Entry from './entry';
import Log from './log';
import SignRoute from './sign-in';

export default <cx>
    <PureContainer layout={FirstVisibleChildLayout}>
        <Sandbox
            key={bind("url")}
            storage={bind("pages")}
            outerLayout={AppLayout}
            layout={FirstVisibleChildLayout}>

            {/*always active route*/}
            <SignRoute if={expr('!{user.id}')}/>

            {/*routes with restricted access*/}
            <Route route="~/" url={bind("url")}>
                <Default />
            </Route>
            <Route route="~/entry/:type" url={bind("url")}>
                <Entry />
            </Route>
            <Route route="~/log" url={bind("url")}>
                <Log />
            </Route>
            <Dashboard />
            <Route route="~/sign-in" url={bind("url")}>
                <SignRoute />
            </Route>
            <Route route="~/settings" url={bind("url")}>
                <Settings />
            </Route>
            <Section title="Page Not Found" mod="card">
                This page doesn't exists. Please check your URL.
            </Section>

        </Sandbox>
    </PureContainer>
</cx>

