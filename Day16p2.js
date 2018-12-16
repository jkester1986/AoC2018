fs = require('fs');
fs.readFile('Day16p2.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let directions = data.split('\n'),
		register = [0,0,0,0];

	directions.forEach((dir, i) => {
		directions[i] = dir.split(' ').map(Number);
	});

	directions.forEach(dir => {
		doDir(register, dir);
		console.log(register);
	});

	console.log(register[0]);

});

function doDir(register, directions) {
	console.log(directions[0]);
	switch (directions[0]) {
		case 1: //addr
			register[directions[3]] = register[directions[1]] + register[directions[2]];
			break;
		case 3: //addi
			register[directions[3]] = register[directions[1]] + directions[2];
			break;
		case 2: //mulr
			register[directions[3]] = register[directions[1]] * register[directions[2]];
			break;
		case 13: //muli
			register[directions[3]] = register[directions[1]] * directions[2];
			break;
		case 5: //banr
			register[directions[3]] = register[directions[1]] & register[directions[2]];
			break;
		case 0: //bani
			register[directions[3]] = register[directions[1]] & directions[2];
			break;
		case 6: //borr
			register[directions[3]] = register[directions[1]] | register[directions[2]];
			break;
		case 10: //bori
			register[directions[3]] = register[directions[1]] | directions[2];
			break;
		case 11: //setr
			register[directions[3]] = register[directions[1]];
			break;
		case 8: //seti
			register[directions[3]] = directions[1];
			break;
		case 15: //gtir
			register[directions[3]] = directions[1] > register[directions[2]] ? 1 : 0;
			break;
		case 4: //gtri
			register[directions[3]] = register[directions[1]] > directions[2] ? 1 : 0;
			break;
		case 14: //gtrr
			register[directions[3]] = register[directions[1]] > register[directions[2]] ? 1 : 0;
			break;
		case 12: //eqir
			register[directions[3]] = directions[1] === register[directions[2]] ? 1 : 0;
			break;
		case 7: //eqri
			register[directions[3]] = register[directions[1]] === directions[2] ? 1 : 0;
			break;
		case 9: //eqrr
			register[directions[3]] = register[directions[1]] === register[directions[2]] ? 1 : 0;
			break;
		default:
			break;
	}
}