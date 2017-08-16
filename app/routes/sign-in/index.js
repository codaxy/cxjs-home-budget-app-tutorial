import {Section, Text, Button} from 'cx/widgets';
import { expr } from 'cx/ui';

import Controller from './Controller';

export default () => <cx>
	<div class="center" controller={Controller} >
		<Section title="Sign In" visible={expr("!{$root.user}")}>
			<p>
				Please sign in using one of the available authentication providers.
			</p>
			<p>
				<a href="#" onClick="signInWithGoogle">
					<img src="~/assets/sign-in/google/btn_google_signin_dark_normal_web.png" />
				</a>
			</p>
			<p>
				<a href="#" onClick="signInWithTwitter">
					<img src="~/assets/sign-in/twitter/sign-in-with-twitter-gray.png" />
				</a>
			</p>
		</Section>

		<Section title="User Info" visible={expr("!!{$root.user}")} ws>
			<p ws>
				You're signed in as <Text tpl="{$root.user.displayName}{$root.user.email:wrap; (;)}" />.
			</p>

			<Button onClick="signOut" mod="hollow">
				Sign Out
			</Button>
		</Section>
	</div>
</cx>
