<script>
	import { Button, TextInput, Content, Grid, Row, Column } from 'carbon-components-svelte';
	import { goto } from '$app/navigation';
	import { leagues } from '$lib/stores/leagues';

	let name = null;

	function createLeague() {
		const newLeagueName = name;
		leagues.update((ls) => {
			ls.push({
				name: newLeagueName,
				players: [
					{
						name: 'Bertil'
					},
					{
						name: 'Tärje'
					},
					{
						name: 'AD'
					},
					{
						name: 'Coco'
					},
					{
						name: 'Claes'
					},
					{
						name: 'Anders'
					}
				],
				matches: [
					{
						id: 1,
						teams: [
							['Bertil', 'Tärje'],
							['AD', 'Coco']
						],
						result: [6, 2]
					},
					{
						id: 2,
						teams: [
							['Bertil', 'AD'],
							['Tärje', 'Anders']
						],
						result: [4, 4]
					},
					{
						id: 3,
						teams: [
							['Bertil', 'Coco'],
							['Tärje', 'Claes']
						],
						result: [3, 5]
					}
				]
			});
			return ls;
		});
		goto('/leagues/' + newLeagueName);
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
