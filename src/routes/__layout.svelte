<script>
	import '$lib/fb';
	import { onMount } from 'svelte';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores/user';
	import Menu from '$lib/components/menu.svelte';

	import 'carbon-components-svelte/css/white.css';

	onMount(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, (value) => {
			if (value) {
				user.set(value);
			} else {
				goto('/login');
				user.set(undefined);
			}
		});
	});
</script>

<Menu />

<slot />
