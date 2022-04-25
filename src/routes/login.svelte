<script>
	import { Button } from 'carbon-components-svelte';
	import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { PasswordInput, TextInput, Content, Grid, Row, Column } from 'carbon-components-svelte';

	let email = null;
	let password = null;
	const auth = getAuth();

	function login() {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				localStorage.setItem('uid', user.uid);
				goto('/');
			})
			.catch((error) => console.error(error));
	}

	function signup() {
		goto('/signup');
	}
</script>

<Content>
	<Grid>
		<Row>
			<Column>
				<h1>Login</h1>
				<TextInput bind:value={email} labelText="Email" placeholder="Enter email..." />
				<br />
				<PasswordInput bind:value={password} labelText="Password" placeholder="Enter password..." />
				<br />
				<Button on:click={login}>Login</Button>
				<br />
				<p>Not a user yet? <Button on:click={signup} kind="ghost">Signup</Button></p>
			</Column>
		</Row>
	</Grid>
</Content>
