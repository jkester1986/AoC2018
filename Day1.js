fs = require('fs');
fs.readFile('Day1.txt', 'utf8', function(err, data) {
	if(err) {
		return console.log(err);
	}
	let lines = data;
	lines = lines.split('\n');

	let total = 0;
	let frequencies = new Array();

	let notFound = true,
		first = true,
		iterations = 0;

	while (notFound) {
		iterations ++
		total = iterateFreqs(lines, total, frequencies, iterations);
		first && console.log("total is:", total);
		first = false;
	}

});

function iterateFreqs(lines, total, frequencies, iterations) {
	let length = lines.length;

	for (let i = 0; i < length; i++) {
		let match = lines[i].match(/^([+-])(\d+)$/);

		switch (match[1]) {
			case '+':
				total += parseInt(match[2]);
				break;
			case '-':
				total -= parseInt(match[2]);
				break;
		}

		if(frequencies.indexOf(total) === -1) {
			frequencies.push(total);
		}
		else {
			console.log("first repeating frequency:", total);
			console.log(`it took ${iterations} iterations`);
			process.exit();
		}
	}

	return total;
}
