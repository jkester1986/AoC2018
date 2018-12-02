fs = require('fs');
fs.readFile('Day2.txt', 'utf8', function(err, data) {
	if(err) {
		return console.log(err);
	}

	lines = data.split('\n');
	let length = lines.length;

	let twoCount = 0;
	let threeCount = 0;

	for (let i = 0; i < length; i++) {
		let chars = lines[i].split("");
		let cLength = 26;
		let charObj = {};
		for(let j = 0; j < cLength; j++) {
			charObj[chars[j]] ? charObj[chars[j]]++ :  charObj[chars[j]] = 1;
		}

		let hasThree = false;
		let hasTwo = false;
		Object.keys(charObj).map((char) => {
			if (charObj[char] === 3) hasThree = true;
			if (charObj[char] === 2) hasTwo = true;
		});
		hasThree && threeCount++;
		hasTwo && twoCount++;
	}

	console.log("P1:", twoCount * threeCount);

	loop:
	while (lines.length > 1) {
		length = lines.length;
		let lineOne = lines[0];
		for (let i = 1; i < length-1; i++) {
			let lineTwo = lines[i];
			let differences = 0;
			let matches = "";
			for (let j = 0; j < 26; j++) {
				if (lineOne[j] === lineTwo[j]) {
					matches += lineOne[j];
				}
				else differences++;
			}
			if (differences === 1) {
				console.log("P2:", matches);
				process.exit();
			}
		}

		lines.shift();
	}
	
});