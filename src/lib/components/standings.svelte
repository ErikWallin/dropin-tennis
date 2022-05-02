<script>
	import { DataTable, TextInput } from 'carbon-components-svelte';
	import { league } from '$lib/stores/leagues';
	import { page } from '$app/stores';

	const headers = [
		{ key: 'name', value: 'Name' },
		{ key: 'matchesPlayed', value: 'Matches Played' },
		{ key: 'matchesWon', value: 'Matches Wins' },
		{ key: 'matchesDraw', value: 'Matches Draws' },
		{ key: 'matchesLost', value: 'Matches Lost' },
		{ key: 'gamesWon', value: 'Games won' },
		{ key: 'gamesLost', value: 'Games lost' },
		{ key: 'points', value: 'Points' }
	];

	let rows;
	$: if ($league) {
		let rowsTemp = {};
		$league.players.forEach((p) => {
			rowsTemp[p.name] = {
				id: p.name,
				name: p.name,
				matchesPlayed: 0,
				matchesWon: 0,
				matchesDraw: 0,
				matchesLost: 0,
				gamesWon: 0,
				gamesLost: 0,
				points: 0
			};
		});
		$league.matches.forEach((m) => {
			m.team1.forEach((p) => {
				rowsTemp[p].matchesPlayed = rowsTemp[p].matchesPlayed + 1;
				if (m.result1) {
					if (m.result1 > m.result2) {
						rowsTemp[p].matchesWon = rowsTemp[p].matchesWon + 1;
					} else if (m.result1 < m.result2) {
						rowsTemp[p].matchesLost = rowsTemp[p].matchesLost + 1;
					} else {
						rowsTemp[p].matchesDraw = rowsTemp[p].matchesDraw + 1;
					}
					rowsTemp[p].points = rowsTemp[p].matchesWon * 2 + rowsTemp[p].matchesDraw;
					rowsTemp[p].gamesWon = rowsTemp[p].gamesWon + m.result1;
					rowsTemp[p].gamesLost = rowsTemp[p].gamesLost + m.result2;
				}
			});
			m.team2.forEach((p) => {
				rowsTemp[p].matchesPlayed = rowsTemp[p].matchesPlayed + 1;
				if (m.result1) {
					if (m.result2 > m.result1) {
						rowsTemp[p].matchesWon = rowsTemp[p].matchesWon + 1;
					} else if (m.result2 < m.result1) {
						rowsTemp[p].matchesLost = rowsTemp[p].matchesLost + 1;
					} else {
						rowsTemp[p].matchesDraw = rowsTemp[p].matchesDraw + 1;
					}
					rowsTemp[p].points = rowsTemp[p].matchesWon * 2 + rowsTemp[p].matchesDraw;
					rowsTemp[p].gamesWon = rowsTemp[p].gamesWon + m.result2;
					rowsTemp[p].gamesLost = rowsTemp[p].gamesLost + m.result1;
				}
			});
		});
		rows = Object.values(rowsTemp).sort((a, b) => {
			const pointsDiff = b.points - a.points;
			if (pointsDiff !== 0) {
				return pointsDiff;
			}
			const gamesDiff = b.gamesWon - b.gamesLost - (a.gamesWon - a.gamesLost);
			if (gamesDiff !== 0) {
				return gamesDiff;
			}
			const matchesPlayedDiff = a.matchesPlayed - b.matchesPlayed;
			if (matchesPlayedDiff !== 0) {
				return matchesPlayedDiff;
			}
			const gamesWonDiff = b.gamesWon - a.gamesWon;
			if (gamesWonDiff !== 0) {
				return gamesWonDiff;
			}
		});
	}
</script>

<DataTable title="Standings" size="compact" {headers} {rows} />
