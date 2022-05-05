<script>
	import {
		Header,
		HeaderUtilities,
		HeaderGlobalAction,
		SkipToContent
	} from 'carbon-components-svelte';
	import Information from 'carbon-icons-svelte/lib/Information.svelte';
	import Logout from 'carbon-icons-svelte/lib/Logout.svelte';
	import Login from 'carbon-icons-svelte/lib/Login.svelte';
	import { user } from '$lib/stores/user';
	import { getAuth, signOut } from 'firebase/auth';
	import { goto } from '$app/navigation';

	const auth = getAuth();

	function logout() {
		signOut(auth).then(() => {
			goto('/login');
		});
	}

	function gotoLogin() {
		goto('/login');
	}

	function gotoAbout() {
		goto('/about');
	}
</script>

<Header company="TiT" platformName="Dropin Tennis">
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
	<HeaderUtilities>
		<HeaderGlobalAction on:click={gotoAbout} aria-label="About" icon={Information} />
		{#if $user}
			<HeaderGlobalAction on:click={logout} aria-label="Logout" icon={Logout} />
		{:else}
			<HeaderGlobalAction on:click={gotoLogin} aria-label="Login" icon={Login} />
		{/if}
	</HeaderUtilities>
</Header>
