let serial = 5791,
	grid = new Array(300);

for (let i = 0; i < 300; i++) {
	grid[i] = (new Array(300));
}


for (let y = 1; y <= 300; y++) {
	for (let x = 1; x <= 300; x++) {
		let rackID = x + 10,
			powerLevel = (rackID * y + serial) * rackID,
			powerLevelStr = ("" + powerLevel);
		let levelLength = powerLevelStr.length;
		powerLevel = levelLength > 2 ? parseInt(powerLevelStr[levelLength-3]) : 0;
		powerLevel -= 5;
		grid[x-1][y-1] = {
			powerLevel
		};
	}
}

function getGreatestPowerByGridSize(size) {
	let greatestPower = 0,
		greatestPowerCoords = {},
		max = 300 - size;
	for (let y = 1; y <= max; y++) {
		for (let x = 1; x <= max; x++) {
			let total = 0;
			for (let y2 = y; y2 < y + size; y2++) {
				for (let x2 = x; x2 < x + size; x2++) {
					total += grid[x2 - 1][y2 - 1].powerLevel;
				}
			}
			if (total > greatestPower) {
				greatestPower = total;
				greatestPowerCoords = {
					x,
					y,
					power: total,
					size
				};
			}
		}
	}

	return greatestPowerCoords;
}

console.log("P1:", getGreatestPowerByGridSize(3));

let gridSize = 300,
	highestPow = 0,
	coords;
while(gridSize > 1) {
	let greatestGrid = getGreatestPowerByGridSize(gridSize),
		highestLocalPow = greatestGrid.power;
	if(highestLocalPow > highestPow) {
		highestPow = highestLocalPow;
		coords = greatestGrid;
	}
	gridSize--;
}

console.log("P2:", coords);