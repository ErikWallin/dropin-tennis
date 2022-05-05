<script>
	import '$lib/fb';
	import { onMount } from 'svelte';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores/user';
	import Menu from '$lib/components/menu.svelte';
	import 'carbon-components-svelte/css/white.css';
	import { query, getDocs, collection, where } from 'firebase/firestore';
	import { db } from '$lib/fb';
	import { leagues } from '$lib/stores/leagues';
	import { browser } from '$app/env';

	onMount(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, (value) => {
			if (value) {
				user.set(value);
				getLeagues();
			} else {
				goto('/login');
				user.set(undefined);
			}
		});
	});

	async function getLeagues() {
		if (browser) {
			const querySnapshot = await getDocs(query(collection(db, "leagues"), where('owners', 'array-contains', $user.uid)));
			const tempLeagues = [];
			querySnapshot.forEach((doc) => {
				tempLeagues.push({
					id: doc.id, 
					name: doc.data().name
				});
			});
			leagues.set(tempLeagues);
		}
	}
</script>

<Menu />

<slot />
