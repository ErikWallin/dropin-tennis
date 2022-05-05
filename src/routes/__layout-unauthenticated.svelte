<script>
	import '$lib/fb';
	import { onMount } from 'svelte';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { user } from '$lib/stores/user';
	import Menu from '$lib/components/menu.svelte';

	import 'carbon-components-svelte/css/white.css';

	onMount(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, (value) => {
			if (value) {
				user.set(value);
			} else {
                user.set(undefined);
            }
		});
	});
</script>

<Menu />

<slot />
