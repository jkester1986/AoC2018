let elf1 = {
		start: 0
	},
	elf2 = {
		start: 1
	},
	recipeScores = [3,7],
	input = 909441,
	end = input + 10,
	pattern = new RegExp('^(\\d+)'+input);

while(recipeScores.length < input * 50) {
	let newScore = (`${recipeScores[elf1.start] + recipeScores[elf2.start]}`).split('');
	newScore.forEach(num => {
		recipeScores.push(parseInt(num));
	});
	elf1.start = (elf1.start + 1 + recipeScores[elf1.start]) % recipeScores.length;
	elf2.start = (elf2.start + 1 + recipeScores[elf2.start]) % recipeScores.length;

	if (recipeScores.length === input + 10) {
		let p1 = "";
		for (let i = input; i < end; i++) {
			p1 += recipeScores[i];
		}
		console.log({p1});
	}
}

let match = recipeScores.join('').match(pattern);
if(match) {
	console.log("p2:", match[1].length);
}
