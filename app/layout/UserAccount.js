import { PureContainer, Link, Text } from 'cx/widgets';
import { Controller, bind, expr } from "cx/ui";

import { auth } from '../api/app';
//import database from '../api/database';

class AuthController extends Controller {
    onInit() {
        auth.onAuthStateChanged((user) => {
            this.store.set(
                "user",
                user && {
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    id: user.uid
                }
            );
        });

    }
}

export default <cx>
    <PureContainer controller={AuthController}>
        <Link
            href="~/sign-in"
            url={bind("url")}
            class="nav-user"
            visible={expr("!!{user.id}")}
        >
            <img
                src={bind("user.photoURL")}
                style="height: 40px; border-radius: 50%; display: block;"
            />
            <span visible={expr("!{user.id}")}>Sign In</span>
        </Link>
        <Link
            href="~/sign-in"
            url={bind("url")}
            mod="top"
            visible={expr("!{user.id} && !{user.loading}")}
        >
            Sign In
		</Link>
    </PureContainer>
</cx>
