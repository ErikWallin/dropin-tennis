<script>
	import { DataTable } from 'carbon-components-svelte';
	import { league } from '$lib/stores/leagues';

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
	const compactHeaders = [
		{ key: 'name', value: '' },
		{ key: 'matchesPlayed', value: 'MP' },
		{ key: 'matchesWon', value: 'MW' },
		{ key: 'matchesDraw', value: 'MD' },
		{ key: 'matchesLost', value: 'ML' },
		{ key: 'gamesWon', value: 'GW' },
		{ key: 'gamesLost', value: 'GL' },
		{ key: 'points', value: 'Pts' }
	];

	let rows;
	$: if ($league) {
		let rowsTemp = {};
		$league.players.forEach((p) => {
			rowsTemp[p.id] = {
				id: p.id,
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
			m.team1.forEach((pId) => {
				rowsTemp[pId].matchesPlayed = rowsTemp[pId].matchesPlayed + 1;
				if (m.result1) {
					if (m.result1 > m.result2) {
						rowsTemp[pId].matchesWon = rowsTemp[pId].matchesWon + 1;
					} else if (m.result1 < m.result2) {
						rowsTemp[pId].matchesLost = rowsTemp[pId].matchesLost + 1;
					} else {
						rowsTemp[pId].matchesDraw = rowsTemp[pId].matchesDraw + 1;
					}
					rowsTemp[pId].points = rowsTemp[pId].matchesWon * 2 + rowsTemp[pId].matchesDraw;
					rowsTemp[pId].gamesWon = rowsTemp[pId].gamesWon + m.result1;
					rowsTemp[pId].gamesLost = rowsTemp[pId].gamesLost + m.result2;
				}
			});
			m.team2.forEach((pId) => {
				rowsTemp[pId].matchesPlayed = rowsTemp[pId].matchesPlayed + 1;
				if (m.result1) {
					if (m.result2 > m.result1) {
						rowsTemp[pId].matchesWon = rowsTemp[pId].matchesWon + 1;
					} else if (m.result2 < m.result1) {
						rowsTemp[pId].matchesLost = rowsTemp[pId].matchesLost + 1;
					} else {
						rowsTemp[pId].matchesDraw = rowsTemp[pId].matchesDraw + 1;
					}
					rowsTemp[pId].points = rowsTemp[pId].matchesWon * 2 + rowsTemp[pId].matchesDraw;
					rowsTemp[pId].gamesWon = rowsTemp[pId].gamesWon + m.result2;
					rowsTemp[pId].gamesLost = rowsTemp[pId].gamesLost + m.result1;
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

<DataTable
		title="Standings"
		size="compact"
		headers={compactHeaders}
		{rows} />
