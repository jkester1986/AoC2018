fs = require('fs');
fs.readFile('Day12.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let pots = "..##.##.##..#..#.#.#.#...#...#####.###...#####.##..#####.#..#.##..#..#.#...#...##.##...#.##......####...",
		lines = data,
		directions = {},
		pattern = /([#.]{5}).{4}([#.])/;
	lines = lines.split('\n');

	lines.forEach(line => {
		let match = line.match(pattern);
		directions[`${match[1]}`] = match[2];
	});

	let potNodes = {},
		potsLength = pots.length;

	for(let i = 0; i < potsLength; i++) {
		potNodes[`${i}`] = {
			pot: pots[i],
		};
	}

	let getRule = (index) => {
		let node = potNodes[`${index}`],
			l = potNodes[`${index-1}`],
			ll = potNodes[`${index-2}`],
			r = potNodes[`${index+1}`],
			rr = potNodes[`${index+2}`];

		if (!l) l = potNodes[`${index-1}`] = { pot: "."};
		if (!ll) ll = potNodes[`${index-2}`] = { pot: "."};
		if (!r) r = potNodes[`${index+1}`] = { pot: "."};
		if (!rr) rr = potNodes[`${index+2}`] = { pot: "."};

		//console.log(l, ll, r, rr, node);

		return ll.pot + l.pot + node.pot + r.pot + rr.pot;
	}
	//console.log(getRule(0));
	let count = 0;

	while (count < 20) {
		let newPots = "";
		Object.keys(potNodes).map(node => {
			let index = parseInt(node),
				rule = getRule(index);
			potNodes[node].nextPot = directions[rule];
			newPots += directions[rule];
		});
		console.log(newPots);

		//TODO: iterate over the nodes again, change pot to nextPot
		//process.exit();
		count++;
	}

});