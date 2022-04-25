<script>
	import {
		Header,
		HeaderUtilities,
		HeaderGlobalAction,
		SkipToContent
	} from 'carbon-components-svelte';
	import Logout from 'carbon-icons-svelte/lib/Logout.svelte';
	import Login from 'carbon-icons-svelte/lib/Login.svelte';
	import { user } from '$lib/stores/user';
	import { getAuth, signOut } from 'firebase/auth';
	import { goto } from '$app/navigation';

	const auth = getAuth();

	function logout() {
		signOut(auth).then(() => {
			localStorage.removeItem('uid');
			goto('/login');
		});
	}

	function gotoLogin() {
		goto('/login');
	}
</script>

<Header company="TiT" platformName="Dropin Tennis">
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
	<HeaderUtilities>
		{#if $user}
			<HeaderGlobalAction on:click={logout} aria-label="Logout" icon={Logout} />
		{:else}
			<HeaderGlobalAction on:click={gotoLogin} aria-label="Login" icon={Login} />
		{/if}
	</HeaderUtilities>
</Header>
