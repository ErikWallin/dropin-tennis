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
						name: 'Bertil',
						startTime: Date.now() - 10000
					},
					{
						name: 'Tärje',
						startTime: Date.now() - 20000
					},
					{
						name: 'AD',
						startTime: Date.now() - 30000
					},
					{
						name: 'Coco',
						startTime: Date.now() - 40000
					},
					{
						name: 'Claes',
						startTime: Date.now() - 50000
					},
					{
						name: 'Anders',
						startTime: Date.now() - 60000
					}
				],
				matches: [
					{
						id: 1,
						team1: ['Bertil', 'Tärje'],
						team2: ['AD', 'Coco'],
						result1: 6,
						result2: 2,
						startTime: Date.now() - 1000,
						endTime: Date.now() - 1
					},
					{
						id: 2,
						team1: ['Bertil', 'AD'],
						team2: ['Tärje', 'Anders'],
						result1: 4,
						result2: 4,
						startTime: Date.now() - 2000,
						endTime: Date.now() - 2
					},
					{
						id: 3,
						team1: ['Bertil', 'Coco'],
						team2: ['Tärje', 'Claes'],
						result1: 3,
						result2: 5,
						startTime: Date.now() - 3000,
						endTime: Date.now() - 3
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
