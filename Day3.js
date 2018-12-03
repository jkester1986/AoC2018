fs = require('fs');
fs.readFile('Day3.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}

	lines = data.split('\n');
	let length = lines.length,
		fabric = new Array(1000),
		fabricCuts = {};

	for (x = 0; x < 1000; x++) {
		fabric[x] = new Array(1000);
	}

	for (let i = 0; i < length; i++) {
		let match = lines[i].match(/^#(\d+)\s@\s(\d+),(\d+):\s(\d+)x(\d+)$/);
		let id = match[1],
			coords = {
				x: parseInt(match[2]),
				y: parseInt(match[3])
			},
			size = {
				width: parseInt(match[4]),
				height: parseInt(match[5])
			};
		fabricCuts[id] = {
			coords,
			size
		};

		for (let y = coords.y; y < size.height+coords.y; y++) {
			for (let x = coords.x; x < size.width+coords.x; x++) {
				fabric[x][y] ? fabric[x][y]++ : fabric[x][y] = 1;
			}
		}
	}
	
	let overlaps = 0;

	for (let x = 0; x < 1000; x++) {
		for(let y = 0; y < 1000; y++) {
			fabric[x][y] > 1 && overlaps++;
		}
	}

	console.log("P1:", overlaps);

	Object.keys(fabricCuts).map((cut) => {
		let id = cut;
		cut = fabricCuts[id];

		let yStart = cut.coords.y,
			xStart = cut.coords.x;
		let yEnd = cut.size.height+yStart,
			xEnd = cut.size.width+xStart,
			hasOverlap = false;

		for(let y = yStart; y < yEnd; y++) {
			for (let x = xStart; x < xEnd; x++) {
				if (fabric[x][y] > 1) {
					hasOverlap = true;
					break;
				}
			}
		}
		if (!hasOverlap) {
			console.log("P2:", id);
		}
	});
});