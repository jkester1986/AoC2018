let //playerCount = 404,
	playerCount = 10,
	players = {
		'1': {
			score: 0
		},
		'2': {
			score: 0
		}
	},
	activePlayer = 2,
	//lastMarbleVal = 71852,
	lastMarbleVal = 1618,
	latestMarbleVal = 2,
	currMarble = 2,
	currMarbleIndex = 1,
	circle = [0, 2, 1]

while (latestMarbleVal !== lastMarbleVal) {
//while (currMarble !== 25) {
	let nextMarble = currMarble + 1;
	activePlayer = nextMarble % playerCount === 0 ? playerCount : nextMarble % playerCount;
	if (!players[`${activePlayer}`]) players[`${activePlayer}`] = {
		score: 0
	}

	//if divisible by 23
	if (nextMarble % 23 === 0) {
		let marbleToRemove = currMarbleIndex - 7;
		if (marbleToRemove < 0) marbleToRemove = circle.length - marbleToRemove;
		let val = circle[marbleToRemove];
		players[`${activePlayer}`].score += nextMarble + val;
		circle.splice(marbleToRemove, 1);
		latestMarbleVal = nextMarble + val;
		currMarbleIndex = marbleToRemove;
		currMarble = nextMarble;
	} else {
		let newIndex = (currMarbleIndex + 2) % circle.length;
		newIndex === 0 ? circle.push(nextMarble) : circle.splice(newIndex, 0, nextMarble);
		currMarble = nextMarble;
		currMarbleIndex = newIndex === 0 ? circle.length - 1 : newIndex;
	}
	//console.log(circle);
}

//console.log(players);
let highscore = 0;
Object.keys(players).map(elf => {
	if (players[elf].score > highscore) highscore = players[elf].score;
});

//console.log(players);

console.log({highscore});