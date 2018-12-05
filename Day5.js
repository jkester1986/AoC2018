fs = require('fs');
fs.readFile('Day5.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let dataOrig = data;

	data = react(data);
	console.log("P1:", data.length);

	let bestReduction = 500000;

	for (let i = 0; i < 26; i++) {
		let char = (i + 10).toString(36);
		let dataOpt = dataOrig;
		let regex = new RegExp("[" + char + char.toUpperCase() + "]", "g");
		dataOpt = dataOpt.replace(regex, '');
		dataOpt = react(dataOpt);
		if (dataOpt.length < bestReduction) {
			bestReduction = dataOpt.length;
		}
	}
	console.log("P2:", bestReduction);
});

function replaceAt(string, index, replace) {
	return string.substring(0, index) + replace + string.substring(index + 1);
}

function react(data) {
	let finishedReactions = false;

	while (!finishedReactions) {
		finishedReactions = true;
		let length = data.length;
		for (let i = 0; i < length - 1; i++) {
			let char1 = data.charAt(i),
				char2 = data.charAt(i + 1);
			if (char1.toLowerCase() === char2.toLowerCase() &&
				((char1 == char1.toUpperCase() && char2 == char2.toLowerCase()) ||
					(char1 == char1.toLowerCase() && char2 == char2.toUpperCase()))) {
				data = replaceAt(data, i, ' ');
				data = replaceAt(data, i + 1, ' ');
				finishedReactions = false;
			}
		}
		data = data.replace(/\s/g, '');
	}

	return data;
}