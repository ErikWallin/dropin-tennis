<script>
	import '$lib/fb';
	import 'carbon-components-svelte/css/white.css';
	import { Button } from 'carbon-components-svelte';
	import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { PasswordInput, TextInput } from 'carbon-components-svelte';
	import { Content, Grid, Row, Column } from 'carbon-components-svelte';

	let email = null;
	let password = null;

	const auth = getAuth();

	function signup() {
		createUserWithEmailAndPassword(auth, email, password)
			.then(() => {
				goto('/');
			})
			.catch((error) => console.error(error));
	}

	function login() {
		goto('/login');
	}
</script>

<Content>
	<Grid>
		<Row>
			<Column>
				<h1>Signup</h1>
				<TextInput bind:value={email} labelText="Email" placeholder="Enter email..." />
				<br>
				<PasswordInput bind:value={password} labelText="Password" placeholder="Enter password..." />
				<br>
				<Button on:click={signup}>Signup</Button>
				<br>
				<p>Already a user? <Button on:click={login} kind="ghost">Login</Button></p>
			</Column>
		</Row>
	</Grid>
</Content>
