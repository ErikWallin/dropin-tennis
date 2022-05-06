<script>
	import { Content, Grid, Row, Column, Link } from 'carbon-components-svelte';
	
	import { leagues } from '$lib/stores/leagues';
	import { user } from '$lib/stores/user'; 
</script>

<Content>
	<Grid>
		<Row>
			<Column>
				<h1>Welcome to Dropin Tennis</h1>
				<p>
					Organizing friendly social singles and doubles. See <Link
						inline
						href="/leagues/about">rules</Link
					> for gameplay.
				</p>
				{#if !$leagues && $user}
				<p>
					It is time to <Link
						inline
						href="/leagues/create">create</Link
					> your first league.
				</p>
				{:else if $leagues && $user}
				<p>
					Select your league in the menu or <Link
						inline
						href="/leagues/create">create</Link
					> another league.
				</p>
				{/if}
			</Column>
		</Row>
	</Grid>
</Content>
