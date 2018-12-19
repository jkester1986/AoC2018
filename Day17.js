fs = require('fs');
fs.readFile('Day17.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n'),
		pattern = /^([xy])=(\d+),\s([xy])=(\d+)\.\.(\d+)$/,
		xMax = 0,
		xMin = 500,
		yMin = 500,
		yMax = 0,
		clayDeposits = { x: new Array(), y: new Array() };

	lines.forEach(line => {
		let match = line.match(pattern);
		if (match[1] === 'x') {
			let xVal = parseInt(match[2]),
				yStart = parseInt(match[4]),
				yEnd = parseInt(match[5]);
			if (yStart < yMin) yMin = yStart;
			if (yEnd > yMax) yMax = yEnd;
			if (xVal > xMax) xMax = xVal;
			if (xVal < xMin) xMin = xVal;
			clayDeposits.x.push({xVal, yStart, yEnd});
		}
		else {
			let yVal = parseInt(match[2]),
				xStart = parseInt(match[4]),
				xEnd = parseInt(match[5]);
			if (yVal < yMin) yMin = yVal;
			if (yVal > yMax) yMax = yVal;
			if (xEnd > xMax) xMax = xEnd;
			if (xStart < xMin) xMin = xStart;
			clayDeposits.y.push({yVal, xStart, xEnd});
		}
	});

	xMax++;

	let ground = new Array(xMax);
	for (let x = 0; x <= xMax; x++) {
		ground[x] = new Array(yMax + 1).fill('.');
	}


	Object.keys(clayDeposits).map(xOrY => {
		if (xOrY === 'x') {
			clayDeposits.x.forEach(deposit => {
				for (let y = deposit.yStart; y <= deposit.yEnd; y++) {
					ground[deposit.xVal][y] = '#';
				}
			});
		}
		else {
			clayDeposits.y.forEach(deposit => {
				for (let x = deposit.xStart; x <= deposit.xEnd; x++) {
					ground[x][deposit.yVal] = '#';
				}
			});
		}
	});

	for(let y = 0; y <= yMax; y++) {
		let string = "";
		for (let x = xMin - 1; x <= xMax; x++) {
			string += ground[x][y];
		}
		console.log(string);
	}

});