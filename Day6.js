fs = require('fs');
fs.readFile('Day6.txt', 'utf8', function(err, data) {
	if(err) {
		return console.log(err);
	}

	let lines = data.split('\n'),
		lowestX = 10000000,
		lowestY = 10000000,
		highestX = 0,
		highestY = 0,
		coords = {};

	lines.forEach((line) => {
		let match = line.match(/(\d+),\s(\d+)/);
		let x = parseInt(match[1]),
			y = parseInt(match[2]);
		coords[`${x},${y}`] = {x,y, largestArea: 1};
		if(x < lowestX) lowestX = x;
		if(x > highestX) highestX = x;
		if(y < lowestY) lowestY = y;
		if(y > highestY) highestY = y;
	});

	let area = 0;
	for (y = lowestY; y <= highestY; y++) {
		for (x = lowestX; x <= highestX; x++) {
			let totalDistance = 0;
			let lowestDistance;
			let closestCoord; 
			Object.keys(coords).map(coord => {
				let distance = getDistance(x, y, coords[coord].x, coords[coord].y);
				totalDistance += distance;
				if (!lowestDistance || distance < lowestDistance) {
					lowestDistance = distance;
					closestCoord = coord;
				}
				else if (distance === lowestDistance) {
					closestCoord = null;
				}
			});

			if(closestCoord) {
				coords[closestCoord].largestArea++;
			}
			
			if (totalDistance < 10000) area++;
		}
	}
	console.log("P2:", area);

	for (y = lowestY; y <= highestY; y++) {
		let grid = '';
		for (x = lowestX; x <= highestX; x++) {
			if(coords[`${x},${y}`]) {
				grid += coords[`${x},${y}`].largestArea;
			}
			else grid += ".";
		}
		//used console.log for p1. I literally looked at the value on my graph and eliminated edges
		//console.log(grid);
	}

	let mostClose = 0;
	Object.keys(coords).map(coord => {
		mostClose = coords[coord].largestArea > mostClose ? coords[coord].largestArea : mostClose;
	});
});

function getDistance(x1, y1, x2, y2) {
	return Math.abs(x2-x1) + Math.abs(y2-y1);
}