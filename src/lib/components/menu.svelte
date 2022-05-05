<script>
	import {
		Header,
		HeaderNav,
		HeaderNavMenu,
		HeaderNavItem,
		HeaderUtilities,
		HeaderGlobalAction,
		SideNav,
		SideNavItems,
		SideNavLink,
		SkipToContent
	} from 'carbon-components-svelte';
	import Information from 'carbon-icons-svelte/lib/Information.svelte';
	import Logout from 'carbon-icons-svelte/lib/Logout.svelte';
	import Login from 'carbon-icons-svelte/lib/Login.svelte';
	import { user } from '$lib/stores/user';
	import { league, leagues } from '$lib/stores/leagues';
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

	let isSideNavOpen = false;
</script>

<Header
		company="TiT"
		platformName="Dropin Tennis"
		href='/'
		bind:isSideNavOpen
		expandedByDefault={false}>
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
	{#if $leagues && $leagues.length > 1 && $league}
	<HeaderNav>
		<HeaderNavMenu text={$league.name}>
			{#each $leagues.filter(l => l.name !== $league.name) as l}
			<HeaderNavItem href={'/leagues/' + l.id} text={l.name} />
			{/each}
		</HeaderNavMenu>
	</HeaderNav>
	{:else if $leagues && $leagues.length > 1 && !$league}
	<HeaderNav>
		<HeaderNavMenu text='Leagues'>
			{#each $leagues as l}
			<HeaderNavItem href={'/leagues/' + l.id} text={l.name} />
			{/each}
		</HeaderNavMenu>
	</HeaderNav>
	{:else if $leagues && $leagues.length === 1 && $league}
	<HeaderNav>
		<HeaderNavItem text={$league.name} />
	</HeaderNav>
	{:else if $leagues && $leagues.length === 1 && !$league}
	<HeaderNav>
		<HeaderNavItem href={'/leagues/' + $leagues[0].id} text={$leagues[0].name} />
	</HeaderNav>
	{/if}
	<HeaderUtilities>
		<HeaderGlobalAction on:click={gotoAbout} aria-label="About" icon={Information} />
		{#if $user}
			<HeaderGlobalAction on:click={logout} aria-label="Logout" icon={Logout} />
		{:else}
			<HeaderGlobalAction on:click={gotoLogin} aria-label="Login" icon={Login} />
		{/if}
	</HeaderUtilities>
</Header>

{#if $leagues && $leagues.length > 1 && $league}
<SideNav bind:isOpen={isSideNavOpen}>
	<SideNavItems>
		{#each $leagues as l}
			{#if l.name === $league.name}
			<SideNavLink text={$league.name} />
			{:else}
			<SideNavLink href={'/leagues/' + l.id} text={l.name} />
			{/if}
		{/each}
	</SideNavItems>
</SideNav>
{:else if $leagues && $leagues.length > 1 && !$league}
<SideNav bind:isOpen={isSideNavOpen}>
	<SideNavItems>
		{#each $leagues as l}
		<SideNavLink href={'/leagues/' + l.id } text={l.name} />
		{/each}
	</SideNavItems>
</SideNav>
{:else if $leagues && $leagues.length === 1 && $league}
<SideNav bind:isOpen={isSideNavOpen}>
	<SideNavItems>
		<SideNavLink text={$league.name} />
	</SideNavItems>
</SideNav>
{:else if $leagues && $leagues.length === 1 && !$league}
<SideNav bind:isOpen={isSideNavOpen}>
	<SideNavItems>
		<SideNavLink href={'/leagues/' + $leagues[0].id } text={$leagues[0].name} />
	</SideNavItems>
</SideNav>
{/if}
