fs = require('fs');
fs.readFile('Day7.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split(/\n/),
		length = lines.length,
		directions = {},
		letters = {},
		letters2 = {};

	for (let i = 0; i < length; i++) {
		let match = lines[i].match(/Step\s([A-Z]).+([A-Z])/);
		if (directions[match[2]]) {
			directions[match[2]].startsWith.indexOf(match[1]) === -1 && directions[match[2]].startsWith.push(match[1]);
		} else {
			directions[match[2]] = {
				startsWith: [match[1]],
				time: match[2].charCodeAt(0) - 4
			};
		}
		letters[match[1]] ? (letters[match[1]].starts = true, letters2[match[1]].starts = true) :
			(letters[match[1]] = {
				starts: true
			}, (letters2[match[1]] = {
				starts: true
			}));
		letters[match[2]] ? (letters[match[2]].ends = true, letters2[match[2]].ends = true) :
			(letters[match[2]] = {
				ends: true
			}, letters2[match[2]] = {
				ends: true
			});
	}


	let directionOrder = "",
		done;

	while (!done) {
		let availableDirections = new Array();
		Object.keys(letters).map(letter => {
			if (!letters[letter].ends) {
				availableDirections.push(letter);
				availableDirections.length > 1 && availableDirections.sort();
			} else {
				//check to see if all start values are in directionOrder
				let hasAll = true;
				directions[letter].startsWith.forEach(l => {
					if (directionOrder.indexOf(l) === -1) hasAll = false;
				});
				if (hasAll) {
					letters[letter].ends = false;
					availableDirections.push(letter);
					availableDirections.length > 1 && availableDirections.sort();
				}
			}
		});

		availableDirections.length > 0 ? (directionOrder += availableDirections[0], delete letters[availableDirections[0]]) : done = true;
	}
	console.log("P1:", directionOrder);

	let getAvailableDirections = () => {
		let availableDirections = new Array();
		Object.keys(letters2).map(letter => {
			if (!letters2[letter].ends) {
				availableDirections.push(letter);
				//availableDirections.length > 1 && availableDirections.sort();
			}
			else {
				//TODO: see if any other letters are ready to go based on what's already in the directionOrder
				let hasAll = directionOrder,
					startsWith = directions[letter].startsWith,
					dOLength = startsWith.length;
				for (let i = 0; i < dOLength; i++) {
					if (directionOrder.indexOf(startsWith[i]) === -1) hasAll = false;
				}
				if (hasAll) {
					availableDirections.push(letter);
					delete letters2[letter].end;
				}
			}
		});
		availableDirections.length > 1 && availableDirections.sort();
		return availableDirections;
	}

	let second = 0,
		workerCount = 5,
		workers = {},
		dOrderLength = directionOrder.length;
	directionOrder = "",
		done = false;

	for (let i = 0; i < workerCount; i++) {
		workers[`${i}`] = {};
	}

	while (dOrderLength !== directionOrder.length) {
		//count down second on elf's letter, or if none, pick a letter. Remove finished letters and add to directionOrder. Elf has to wait if no letters free
		for(let i = 0; i < workerCount; i++) {
			if (workers[`${i}`].letter) {
				workers[`${i}`].time--;
				if (workers[`${i}`].time === 0) {
					directionOrder += workers[`${i}`].letter;
					workers[`${i}`].letter = null;
				}
			}
			let availableDirections = getAvailableDirections();
			if (availableDirections.length > 0 && !workers[`${i}`].letter) {
				workers[`${i}`].letter = availableDirections[0];
				workers[`${i}`].time = workers[`${i}`].letter.charCodeAt(0) - 4;
				delete letters2[availableDirections[0]];
				availableDirections.shift();
			}
		}

		second++;
	}

	console.log("P2:", second-1);
});