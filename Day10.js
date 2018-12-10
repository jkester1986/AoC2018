fs = require('fs');
fs.readFile('Day10.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n'),
		length = lines.length;
		pattern = /position=<\s*(-?\d+),\s*(-?\d+)> velocity=<\s*(-?\d+),\s*(-?\d+)>/,
		stars = new Array();


	lines.forEach(line => {
		let match = line.match(pattern);
		stars.push({
			x: parseInt(match[1]),
			y: parseInt(match[2]),
			velocity: {
				x: parseInt(match[3]),
				y: parseInt(match[4])
			}
		});
	});


	//found when all coords became positive, then output coords every second until got text
	//then just use the seconds to spit out the answer
	let seconds = 10144; //answer to p2

	stars.forEach(star => {
		star.x = star.x + star.velocity.x*seconds;
		star.y = star.y + star.velocity.y*seconds;
	});

	for (let y = 140; y < 150; y++) {
		let row = "";
		for (let x = 118; x < 182; x++) {
			let foundStar = false;
			for (let i = 0; i < length; i++) {
				if (stars[i].x === x && stars[i].y === y) {
					foundStar = true;
					break;
				}
			}
			row += foundStar ? '  ' : '..';
		}
		console.log(row);
	}

});