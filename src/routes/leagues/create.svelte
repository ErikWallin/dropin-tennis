<script>
	import { Button, TextInput, Content, Grid, Row, Column } from 'carbon-components-svelte';
	import { goto } from '$app/navigation';
	import { collection, addDoc } from 'firebase/firestore';
	import { db } from '$lib/fb';
	import { user } from '$lib/stores/user';

	let name = null;

	async function createLeague() {
		const newLeagueName = name;
		const docRef = await addDoc(collection(db, 'leagues'), {
			owners: [$user.uid],
			name: newLeagueName,
			players: [],
			matches: []
		});
		goto('/leagues/' + docRef.id);
	}
</script>

<Content>
	<Grid>
		<Row>
			<Column>
				<h1>Create League</h1>
				<TextInput bind:value={name} labelText="Name" />
				<br />
				<Button on:click={createLeague}>Create</Button>
			</Column>
		</Row>
	</Grid>
</Content>
