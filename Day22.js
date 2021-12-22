let depth = 5913,
	target = {
		x: 8,
		y: 701
	};

let cave = new Array(8);

for (let x = 0; x < target.x+1; x++) {
	cave[x] = new Array(target.y+1);
}

let riskLevel = 0;

for (let y = 0; y <= target.y; y++) {
	for (let x = 0; x <= target.x; x++) {
		if ((x === 0 && y === 0) || (x === target.x && y === target.y)) cave[x][y] = {
			risk: 0,
			erosion: 0
		};
		else {
			let geoInd;

			if (y === 0)
				geoInd = x * 16807;
			else if (x === 0)
				geoInd = y * 48271;
			else
				geoInd = cave[x-1][y].erosion * cave[x][y-1].erosion;

			let erosion = (geoInd + depth) % 20183;

			let risk = erosion % 3;

			cave[x][y] = {
				erosion,
				risk
			};
			riskLevel += risk;
		}
	}
}

console.log(riskLevel);