<script>
	import {
		Button,
		Modal,
		DataTable,
		TextInput,
		Toolbar,
		ToolbarContent,
		RadioButtonGroup,
		RadioButton
	} from 'carbon-components-svelte';
	import { leagues } from '$lib/stores/leagues';
	import { page } from '$app/stores';

	const headers = [
		{ key: 'name', value: 'Name' },
		{ key: 'queueTime', value: 'Queue time' },
		{ key: 'matches', value: 'Matches' }
	];

	let newPlayerName = null;
	let league;
	let rows;
	leagues.subscribe((value) => {
		league = value.find((v) => v.name === $page.params.name);
		rows =
			league.players &&
			league.players.map((p) => {
				return {
					id: p.name,
					name: p.name,
					queueTime: '2h',
					matches: league.matches
						.map((m) => m.teams.flat())
						.flat()
						.filter((pn) => pn === p.name).length
				};
			});
	});
	let selectedRowIds = [];

	let addPlayerOpen = false;
	function addPlayer() {
		if (newPlayerName) {
			leagues.update((ls) => {
				const l = ls.find((v) => v.name === $page.params.name);
				l.players.push({
					name: newPlayerName
				});
				return ls;
			});
			newPlayerName = null;
		}
		addPlayerOpen = false;
	}

	let newMatchOpen = false;
	let doublesPartner = null;
	function prepareNewMatch() {
		doublesPartner = selectedRowIds[1];
		newMatchOpen = true;
	}
	function newMatch() {
		if (selectedRowIds.length === 2) {
			leagues.update((ls) => {
				const l = ls.find((v) => v.name === $page.params.name);
				l.matches.push({
					id: Math.floor(Math.random() * 10000) + 1,
					teams: [[selectedRowIds[0]], [selectedRowIds[1]]],
					result: null
				});
				return ls;
			});
			selectedRowIds = [];
		} else if (selectedRowIds.length === 4) {
			leagues.update((ls) => {
				const l = ls.find((v) => v.name === $page.params.name);
				l.matches.push({
					id: Math.floor(Math.random() * 10000) + 1,
					teams: [
						[selectedRowIds[0], doublesPartner],
						selectedRowIds.filter((p) => p !== selectedRowIds[0] && p !== doublesPartner)
					],
					result: null
				});
				return ls;
			});
			selectedRowIds = [];
		}
		newMatchOpen = false;
	}
</script>

<DataTable title="Players" size="compact" batchSelection bind:selectedRowIds {headers} {rows}>
	<Toolbar>
		<ToolbarContent>
			<Button kind="tertiary" on:click={() => (addPlayerOpen = true)}>Add Player</Button>
			<Button kind="tertiary" on:click={prepareNewMatch}>New Match</Button>
		</ToolbarContent>
	</Toolbar>
</DataTable>

<Modal
	bind:open={addPlayerOpen}
	modalHeading="Add Player"
	primaryButtonText="Confirm"
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (addPlayerOpen = false)}
	on:click:button--primary={() => addPlayer()}
	on:open
	on:close
	on:submit
>
	<TextInput bind:value={newPlayerName} labelText="Name" />
</Modal>

<Modal
	bind:open={newMatchOpen}
	modalHeading="New Match"
	primaryButtonText="Confirm"
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (newMatchOpen = false)}
	on:click:button--primary={() => newMatch()}
	on:open
	on:close
	on:submit
>
	{#if selectedRowIds.length === 4}
		<p>Who will have the honor to play with {selectedRowIds[0]}</p>
		<RadioButtonGroup bind:selected={doublesPartner}>
			<RadioButton labelText={selectedRowIds[1]} value={selectedRowIds[1]} />
			<RadioButton labelText={selectedRowIds[2]} value={selectedRowIds[2]} />
			<RadioButton labelText={selectedRowIds[3]} value={selectedRowIds[3]} />
		</RadioButtonGroup>
	{/if}
</Modal>
