fs = require('fs');
fs.readFile('Day12.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let pots = "##.##.##..#..#.#.#.#...#...#####.###...#####.##..#####.#..#.##..#..#.#...#...##.##...#.##......####.".split(''),
		lines = data,
		directions = {},
		pattern = /([#.]{5}).{4}([#.])/;
	lines = lines.split('\n');

	lines.forEach(line => {
		let match = line.match(pattern);
		directions[`${match[1]}`] = match[2];
	});

	let pot0 = 0;

	let generation = 0;
	while (generation < 20) {
		generation++;
		nextGen = [...pots];

		let length = pots.length;
		let toAddLeft = 0;
		let toAddRight = 0;

		for (let i = 0; i < length; i++) {
			let loc1 = pots[i-2];
			let loc2 = pots[i-1];
			let currPot = pots[i];
			let loc4 = pots[i+1];
			let loc5 = pots[i+2];
			if (!loc1) {
				loc1 = '.';
				toAddLeft++;
			}
			if (!loc2) {
				loc2 = '.';
				toAddLeft++;
			}
			if (!loc4) {
				loc4 = '.';
				toAddRight++;
			}
			if (!loc5) {
				loc5 = '.';
				toAddRight++;
			}
			const mapping = `${loc1}${loc2}${currPot}${loc4}${loc5}`;
			nextGen[i] = directions[mapping];
		}
		const nextGenString = nextGen.join('');
		if (toAddLeft && !nextGenString.startsWith('...')) {
			pot0 = toAddLeft ?
				toAddLeft >= 2 ? pot0 + 2 : pot0 + 1 :
				pot0;
			nextGen.unshift('.');
			if (toAddLeft >= 2) {
				nextGen.unshift('.');
			}
		}
		if (toAddRight && !nextGenString.endsWith('...')) {
			nextGen.push('.');
			if (toAddRight >= 2) {
				nextGen.push('.');
			}
		}
		pots = nextGen;
	}

	let sum = pots.reduce((acc, pot, i) => {
		let actualIndex = i - pot0;
		if (pot === '#') {
			acc += actualIndex;
		}
		return acc;
	}, 0);
	console.log(sum);
});