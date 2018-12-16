fs = require('fs');
fs.readFile('Day16p1.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n'),
		length = lines.length,
		samples = new Array(),
		beforeAfterPattern = /\[(\d+),\s(\d+),\s(\d+),\s(\d+)\]/,
		instructionsPattern = /(\d+)\s(\d+)\s(\d+)\s(\d+)/,
		tests = ["addr", "addi", "mulr", "muli", "banr", "bani", "borr", "bori", "setr",
				"seti", "gtir", "gtri", "gtrr", "eqir", "eqri", "eqrr"],
		opCodes = {};


	for (let i = 0; i < length; i+=4) {
		let before = lines[i].match(beforeAfterPattern),
			instructions = lines[i+1].match(instructionsPattern),
			after = lines[i+2].match(beforeAfterPattern);

		let sample = {
			before: [parseInt(before[1]), parseInt(before[2]), parseInt(before[3]), parseInt(before[4])],
			instructions: [parseInt(instructions[1]), parseInt(instructions[2]), parseInt(instructions[3]), parseInt(instructions[4])],
			after: [parseInt(after[1]), parseInt(after[2]), parseInt(after[3]), parseInt(after[4])],
			possOpCodes: new Array()
		}
		samples.push(sample);
	}

	//TODO: for each sample, run through every direction and see if it works
	//make a copy of the regsiter so it's not overwritten
	let atLeast3OpCodes = 0;
	samples.forEach(sample => {
		tests.forEach(test => {
			let beforeCopy = sample.before.slice(0);
			try {
				doDir(test, beforeCopy, sample.instructions);
				let isEqual = true;
				for (let i = 0; i < 4; i++) {
					if (beforeCopy[i] !== sample.after[i]) {
						isEqual = false;
						break;
					}
				}
				if (isEqual) {
					sample.possOpCodes.push(test);
					opCodes[`${sample.instructions[0]}`] ?
						opCodes[`${sample.instructions[0]}`].indexOf(test) === -1 && opCodes[`${sample.instructions[0]}`].push(test) :
						opCodes[`${sample.instructions[0]}`] = [test];
				}
			}
			catch (e) {
				//will happen when index is out of bounds, on directions that don't work
			}
		});
		if (sample.possOpCodes.length > 2) atLeast3OpCodes++;
	});

	console.log("p1:", atLeast3OpCodes);

});

function doDir(direction, register, values) {
	switch(direction) {
		case 'addr':
			register[values[3]] = register[values[1]] + register[values[2]];
			break;
		case 'addi':
			register[values[3]] = register[values[1]] + values[2];
			break;
		case 'mulr':
			register[values[3]] = register[values[1]] * register[values[2]];
			break;
		case 'muli':
			register[values[3]] = register[values[1]] * values[2];
			break;
		case 'banr':
			register[values[3]] = register[values[1]] & register[values[2]];
			break;
		case 'bani':
			register[values[3]] = register[values[1]] & values[2];
			break;
		case 'borr':
			register[values[3]] = register[values[1]] | register[values[2]];
			break;
		case 'bori':
			register[values[3]] = register[values[1]] | values[2];
			break;
		case 'setr':
			register[values[3]] = register[values[1]];
			break;
		case 'seti':
			register[values[3]] = values[1];
			break;
		case 'gtir':
			register[values[3]] = values[1] > register[values[2]] ? 1 : 0;
			break;
		case 'gtri':
			register[values[3]] = register[values[1]] > values[2] ? 1 : 0;
			break;
		case 'gtrr':
			register[values[3]] = register[values[1]] > register[values[2]] ? 1 : 0;
			break;
		case 'eqir':
			register[values[3]] = values[1] === register[values[2]] ? 1 : 0;
			break;
		case 'eqri':
			register[values[3]] = register[values[1]] === values[2] ? 1 : 0;
			break;
		case 'eqrr':
			register[values[3]] = register[values[1]] === register[values[2]] ? 1 : 0;
			break;
		default:
			break;
	}
}