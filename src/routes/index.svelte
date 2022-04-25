<script>
	import { leagues } from '$lib/stores/leagues';
	import Createleague from './leagues/create.svelte';

	import { Content, Grid, Row, Column, Link } from 'carbon-components-svelte';
</script>

<Content>
	<Grid>
		<Row>
			<Column>
				<h1>Welcome to Dropin Doubles</h1>
				<p>
					Organizing friendly social doubles. It is time to start your first <Link
						inline
						href="/leagues/create">league</Link
					>
				</p>
			</Column>
		</Row>
	</Grid>
</Content>
