let playerCount = 404,
	//playerCount = 9,
	players = {
		'1': {
			score: 0
		},
		'2': {
			score: 0
		}
	},
	activePlayer = 2,
	lastMarbleVal = 71852,
	//lastMarbleVal = 1618,
	latestMarbleVal = 2,
	currMarble = 2;

//set up the initial 3 nodes
let node0 = {
	marble: 0
};
let node1 = {
	left: node0,
	right: node0,
	marble: 1
};
let node2 = {
	marble: 2,
	left: node0,
	right: node1
};
node1.left = node2;
node0.left = node1;
node0.right = node2;
let activeMarble = node2;

//insert based on provided node (provided node assumes the active node)
function insertMarble(node, val) {
	let rightMarble = node.right;
		insertBefore = rightMarble.right;
	let newNode = {
		marble: val,
		left: rightMarble,
		right: insertBefore
	};
	rightMarble.right = newNode;
	insertBefore.left = newNode;

	return newNode;
}

//reove based on provided node (assumes provided node is the active node)
function removeMarble(node) {
	let nodeToRemove = node;
	for(let i = 0; i < 7; i++) {
		nodeToRemove = nodeToRemove.left;
	}
	nodeToRemove.left.right = nodeToRemove.right;
	nodeToRemove.right.left = nodeToRemove.left;
	return nodeToRemove;
}

while (latestMarbleVal !== lastMarbleVal) {
//while (currMarble !== 25) {
	let nextMarble = currMarble + 1;
	activePlayer = nextMarble % playerCount === 0 ? playerCount : nextMarble % playerCount;
	if (!players[`${activePlayer}`]) players[`${activePlayer}`] = {
		score: 0
	}

	//if divisible by 23
	if (nextMarble % 23 === 0) {

		let removedNode = removeMarble(activeMarble);
		players[`${activePlayer}`].score += nextMarble + removedNode.marble;
		activeMarble = removedNode.right;
		delete removedNode;
		currMarble = nextMarble;

	} else {
		activeMarble = insertMarble(activeMarble, nextMarble);
		currMarble = nextMarble;
	}
}

let highscore = 0;
Object.keys(players).map(elf => {
	if (players[elf].score > highscore) highscore = players[elf].score;
});

//console.log(players);

console.log({highscore});