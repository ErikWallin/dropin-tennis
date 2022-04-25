<script>
	import Players from '$lib/components/Players.svelte';
	import Matches from '$lib/components/Matches.svelte';
	import Standings from '$lib/components/Standings.svelte';

	import { Content, Grid, Row, Column } from 'carbon-components-svelte';
</script>

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
