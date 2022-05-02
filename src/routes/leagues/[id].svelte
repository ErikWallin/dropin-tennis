<script>
	import Players from '$lib/components/Players.svelte';
	import Matches from '$lib/components/Matches.svelte';
	import Standings from '$lib/components/Standings.svelte';

	import { Content, Grid, Row, Column } from 'carbon-components-svelte';
	import { doc, onSnapshot } from 'firebase/firestore';
	import { db } from '$lib/fb';
	import { page } from '$app/stores';
	import { Loading } from 'carbon-components-svelte';
	import { league } from '$lib/stores/leagues';
	import { browser } from '$app/env';

	if (browser) {
		onSnapshot(doc(db, 'leagues', $page.params.id), (doc) => {
			league.set(doc.data());
		});
	}
</script>

{#if league}
	<Content>
		<Grid>
			<Row>
				<Column>
					<Players />
				</Column>
			</Row>
			<Row>
				<Column>
					<Matches />
				</Column>
			</Row>
			<Row>
				<Column>
					<Standings />
				</Column>
			</Row>
		</Grid>
	</Content>
{:else}
	<Loading />
{/if}
