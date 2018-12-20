fs = require('fs');
fs.readFile('Day18.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n'),
		xLength = lines[0].length,
		yLength = lines.length,
		land = new Array(xLength),
		landNext = new Array(xLength),
		strings = {};

	for (let i = 0; i < xLength; i ++) {
		land[i] = new Array(yLength);
		landNext[i] = new Array(yLength);
	}

	let initialString = "";
	lines.forEach((line, y) => {
		initialString += line;
		for (let x = 0; x < xLength; x++) {
			land[x][y] = line[x];
		}
		strings[initialString] = true;
	});

	let getNextState = (x,y) => {
		let xMin = x - 1 > -1 ? x - 1 : x,
			xMax = x + 1 < xLength ? x + 1 : x,
			yMin = y - 1 > -1 ? y - 1 : y,
			yMax = y + 1 < yLength ? y + 1 : y,
			trees = 0,
			lumber = 0;

			//console.log({xMin, xMax, yMin, yMax});

		for(let x1 = xMin; x1 <= xMax; x1++) {
			for(let y1 = yMin; y1 <= yMax; y1++) {
				if(! (x === x1 && y === y1)) {
					switch(land[x1][y1]) {
						case '#':
							lumber++;
							break;
						case '|':
							trees++;
							break;
						default: break;
					}
				}
			}
		}

		switch(land[x][y]) {
			case '.':
				if (trees >= 3) return '|';
				else return '.';
				break;
			case '|':
				if (lumber >= 3) return '#';
				else return '|';
				break;
			case '#':
				if (lumber >= 1 && trees >= 1) return '#';
				else return '.';
				break;
		}
	}

	let count = 0,
		match = false;
	while (!match) { //p1 was just 10 iterations
		for (let y = 0; y < yLength; y++) {
			for (let x = 0; x < xLength; x++) {
				landNext[x][y] = getNextState(x,y);
			}
		}
		let string = "";
		for (let y = 0; y < yLength; y++) {
			for (let x = 0; x < xLength; x++) {
				land[x][y] = landNext[x][y];
				string += land[x][y];
			}
		}
		count++;
		if(strings[string]) {
			match = true;
			count = count - strings[string];//this is how many cycles it takes to repeat
		}
		else strings[string] = count;
	}

	//this section is for p2
	let upTo = 1000000000 % count;
		count = 0;

	while (count < upTo) {
		for (let y = 0; y < yLength; y++) {
			for (let x = 0; x < xLength; x++) {
				landNext[x][y] = getNextState(x, y);
			}
		}
		for (let y = 0; y < yLength; y++) {
			for (let x = 0; x < xLength; x++) {
				land[x][y] = landNext[x][y];
			}
		}
		count++;
	}

	let treeCount = 0,
		lumberCount = 0;
	for (let y = 0; y < yLength; y++) {
		let string = "";
		for (let x = 0; x < xLength; x++) {
			let acre = land[x][y];
			if(acre === '|') treeCount++;
			if(acre === '#') lumberCount++;
			string += acre;
		}
		console.log(string);
	}

	console.log(`${treeCount * lumberCount}`);

});