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

    for(let i = 0; i < length; i++) {
        let match = lines[i].match(/Step\s([A-Z]).+([A-Z])/);
        if(directions[match[2]]) {
            directions[match[2]].startsWith.indexOf(match[1]) === -1 && directions[match[2]].startsWith.push(match[1]);
        }
        else {
            directions[match[2]] = {
                startsWith: [match[1]],
                time: match[2].charCodeAt(0) - 4
            };
        }
        letters[match[1]] ? (letters[match[1]].starts = true, letters2[match[1]].starts = true)
            : (letters[match[1]] = { starts: true }, (letters2[match[1]] = { starts: true }));
        letters[match[2]] ? (letters[match[2]].ends = true, letters2[match[2]].ends = true)
            : (letters[match[2]] = { ends: true }, letters2[match[2]] = { ends: true });
    }

    console.log(directions);

    let directionOrder = "",
        done;

    while(!done) {
        let availableDirections = new Array();
        Object.keys(letters).map(letter => {
            if (!letters[letter].ends) {
                availableDirections.push(letter);
                availableDirections.length > 1 && availableDirections.sort();
            }
            else {
                //check to see if all start values are in directionOrder
                let hasAll = true;
                directions[letter].startsWith.forEach(l => {
                    if (directionOrder.indexOf(l) === -1) hasAll = false;
                });
                if(hasAll) {
                    letters[letter].ends = false;
                    availableDirections.push(letter);
                    availableDirections.length > 1 && availableDirections.sort();
                }
            }
        });

        availableDirections.length > 0 ? (directionOrder += availableDirections[0], delete letters[availableDirections[0]]) : done = true;
    }
    console.log("P1:", directionOrder);

    directionOrder = "",
    done,
    count = 0;

    console.log(letters2);

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

});