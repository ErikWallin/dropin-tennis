<script>
	import { leagues } from '$lib/stores/leagues';
	import { page } from '$app/stores';
	import {
		Button,
		DataTable,
		NumberInput,
		Toolbar,
		ToolbarContent,
		Modal,
		Grid,
		Row,
		Column
	} from 'carbon-components-svelte';

	const headers = [
		{ key: 'opponents', value: 'Opponents' },
		{ key: 'result', value: 'Result' }
	];

	let league;
	let rows;
	leagues.subscribe((value) => {
		league = value.find((v) => v.name === $page.params.name);
		rows = league.matches.map((m) => {
			const opponents =
				m.team1[0] +
				(m.team1[1] ? '/' + m.team1[1] : '') +
				' vs ' +
				m.team2[0] +
				(m.team2[1] ? '/' + m.team2[1] : '');
			return {
				id: m.id,
				opponents: opponents,
				result: m.result1 && m.result2 ? m.result1 + '-' + m.result2 : 'ongoing'
			};
		});
	});

	let selectedRowIds = [];
	$: selectedMatch =
		selectedRowIds[0] && league.matches.filter((m) => m.id === selectedRowIds[0])[0];

	$: isRemoveEnabled = selectedRowIds.length > 0;
	let removeMatchOpen = false;
	function removeMatch() {
		leagues.update((ls) => {
			const l = ls.find((v) => v.name === $page.params.name);
			l.matches = l.matches.filter((m) => !selectedRowIds.includes(m.id));
			return ls;
		});
		selectedRowIds = [];
		removeMatchOpen = false;
	}

	$: isEditEnabled = selectedRowIds.length === 1;
	let editMatchOpen = false;
	function editMatch() {
		leagues.update((ls) => {
			return ls;
		});
		selectedRowIds = [];
		editMatchOpen = false;
	}
</script>

<DataTable title="Matches" size="compact" radio bind:selectedRowIds {headers} {rows}>
	<Toolbar>
		<ToolbarContent>
			<Button disabled={!isEditEnabled} kind="tertiary" on:click={() => (editMatchOpen = true)}
				>Edit</Button
			>
			<Button disabled={!isRemoveEnabled} kind="tertiary" on:click={() => (removeMatchOpen = true)}
				>Remove</Button
			>
		</ToolbarContent>
	</Toolbar>
</DataTable>

<Modal
	bind:open={removeMatchOpen}
	modalHeading="Remove Match"
	primaryButtonText="Confirm"
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (removeMatchOpen = false)}
	on:click:button--primary={() => removeMatch()}
	on:open
	on:close
	on:submit
>
	<p>Are you sure you want to remove the selected match(es)?</p>
</Modal>

<Modal
	bind:open={editMatchOpen}
	modalHeading="Edit Match"
	primaryButtonText="Confirm"
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (editMatchOpen = false)}
	on:click:button--primary={() => editMatch()}
	on:open
	on:close
	on:submit
>
	{#if selectedMatch}
		<Grid>
			<Row>
				<Column>
					{selectedMatch.team1[0] + (selectedMatch.team1[1] ? '/' + selectedMatch.team1[1] : '')}
				</Column>
				<Column>
					<NumberInput min={0} max={8} bind:value={selectedMatch.result1} />
				</Column>
			</Row>
			<Row>
				<Column>
					{selectedMatch.team2[0] + (selectedMatch.team2[1] ? '/' + selectedMatch.team2[1] : '')}
				</Column>
				<Column>
					<NumberInput min={0} max={8} bind:value={selectedMatch.result2} />
				</Column>
			</Row>
		</Grid>
		<p />
		<p />
	{/if}
</Modal>
