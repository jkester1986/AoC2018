fs = require('fs');
fs.readFile('Day4.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}

	let lines = data.split('\n');
	lines = lines.sort(dateSort);

	let guards = {},
		length = lines.length,
		currentGuard,
		sleep;

	lines.forEach((line) => {
		let idMatch = line.match(/(\d+):(\d+)\].+#(\d+)\sbegins\sshift/);
		if (idMatch) {
			if (!guards[idMatch[3]]) {
				guards[idMatch[3]] = {
					id: idMatch[3],
					sleep: new Array(60).fill(0)
				};
			}
			currentGuard = guards[idMatch[3]];
		}
		else {
			let wakeMatch = line.match(/:(\d+)\]\swakes\sup/);
			let sleepMatch = line.match(/:(\d+)\]\sfalls\sasleep/);
			sleep = sleepMatch ? parseInt(sleepMatch[1]) : sleep;

			if (wakeMatch) {
				let wake = parseInt(wakeMatch[1]);
				for (let i = sleep; i < wake; i++) {
					currentGuard.sleep[i]++;
				}
			}
		}
	});

	let sleepiestGuard;
	let sleepiestTime = 0;
	Object.keys(guards).map((guard) => {
		let sleepTime = 0;
		guards[guard].sleep.forEach((min) => {
			sleepTime += min;
		});
		if(sleepTime > sleepiestTime) {
			sleepiestTime = sleepTime;
			sleepiestGuard = guards[guard].id;
		}
	});

	let sleepiestMinute = 0;
	let mostTimesAsleep = 0;
	guards[sleepiestGuard].sleep.forEach((timesAsleep, min) => {
		if(timesAsleep > mostTimesAsleep) {
			mostTimesAsleep = timesAsleep;
			sleepiestMinute = min;
		}
	});

	console.log("P1:", parseInt(sleepiestGuard)*sleepiestMinute);

	sleepiestMinute = 0;
	mostTimesAsleep = 0;
	sleepiestGuard = null;
	Object.keys(guards).map((guard) => {
		guards[guard].sleep.forEach((timesAsleep, min) => {
			if (timesAsleep > mostTimesAsleep) {
				mostTimesAsleep = timesAsleep;
				sleepiestMinute = min;
				sleepiestGuard = guards[guard].id;
			}
		});
	});

	console.log("P2:", parseInt(sleepiestGuard)*sleepiestMinute);
});

function dateSort(a,b){
	let aDate = new Date(a.match(/\[(.+)\]/)[1]);
		bDate = new Date(b.match(/\[(.+)\]/)[1]);
	return aDate - bDate;
}