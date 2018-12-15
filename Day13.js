fs = require('fs');
fs.readFile('Day13.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}

	let lines = data.split('\n'),
		yMax = lines.length,
		xMax = lines[0].length,
		grid = new Array(xMax),
		carts = new Array();
		
	for(y = 0; y < yMax; y++) {
		for(x = 0; x < xMax; x++) {
			grid[x] = new Array(yMax);
		}
	}

	lines.forEach((line, y) => {
		for (x = 0; x < xMax; x++) {
			let char = line.charAt(x),
				pattern = /[v<>^]/;
			if(char.match(pattern)) {
				let cart = {
					x,
					y,
					nextTurnDirection: "left"
				};
				switch(char) {
					case 'v':
						cart.direction = "up";
						grid[x][y] = '|';
						break;
					case '^':
						cart.direction = "down";
						grid[x][y] = '|'
						break;
					case '>':
						cart.direction = "right";
						grid[x][y] = '-';
						break;
					case '<':
						cart.direction = "left";
						grid[x][y] = '-';
						break;
				}
				carts.push(cart);
			}
			else grid[x][y] = char;
		}
	});

	let getNextTurnDir = (turningDir) => {
		switch(turningDir) {
			case 'left':
				return "straight";
			case 'straight':
				return "right";
			case 'right':
				return "left";
		}
	};

	let cartSort = (a,b) => {
		if (a.x < b.x) return -1;
		if (a.x > b.x) return 1;
		if (a.y < b.y) return -1;
		if (a.y > b.y) return 1;
		if (a.y === b.y) return 0;
	};

	let collision = false;

	while(carts.length > 1) {
		carts.sort(cartSort);
		carts.forEach((cart, ind) => {
			//move the cart
			let pattern = /[/\\+]/,
				nextX,
				nextY
			switch(cart.direction){
				case "up":
					nextX = cart.x;
					nextY = cart.y + 1;
					break;
				case "down":
					nextX = cart.x;
					nextY = cart.y - 1;
					break;
				case "left":
					nextX = cart.x - 1;
					nextY = cart.y;
					break;
				case "right":
					nextX = cart.x + 1;
					nextY = cart.y;
					break;
			}
			let nextPos = grid[nextX][nextY];

			cart.x = nextX;
			cart.y = nextY;

			if(nextPos.match(pattern)) {
				//change directions
				switch (nextPos) {
					case '\\':
						if(cart.direction === "left") cart.direction = "down";
						else if(cart.direction === "right") cart.direction = "up";
						else if(cart.direction === "up") cart.direction = "right";
						else if(cart.direction === "down") cart.direction = "left";
						break;
					case '/':
						if(cart.direction === "left") cart.direction = "up";
						else if(cart.direction === "right") cart.direction = "down";
						else if(cart.direction === "up") cart.direction = "left";
						else if(cart.direction === "down") cart.direction = "right";
						break;
					case '+':
						let nextTurnDir = getNextTurnDir(cart.nextTurnDirection),
							currentTurnDir = cart.nextTurnDirection;
						
						cart.nextTurnDirection = nextTurnDir;
						if(currentTurnDir === "left") {
							if(cart.direction === "left") cart.direction = "up";
							else if(cart.direction === "right") cart.direction = "down";
							else if(cart.direction === "up") cart.direction = "right";
							else if(cart.direction === "down") cart.direction = "left";
						}
						else if (currentTurnDir === "right") {
							if(cart.direction === "left") cart.direction = "down";
							else if(cart.direction === "right") cart.direction = "up";
							else if(cart.direction === "up") cart.direction = "left";
							else if(cart.direction === "down") cart.direction = "right";
						}
						//don't need to do anything if going straight
						
						break;
				}
			}

			//check to see if there is a collision, and be ready to remove those
			carts.forEach((compCart, i) => {
				if (i === ind || compCart.gone || cart.gone) return;
				if (compCart.x === cart.x && compCart.y === cart.y) {
					!collision && console.log(`first collision at ${cart.x},${cart.y}`);
					collision = true;
					cart.gone = true;
					compCart.gone = true;
					//process.exit();
				}
			});

		});

		//remove any carts that are gone
		let cartLength = carts.length;
		for (let i = cartLength-1; i >= 0; i--) {
			carts[i].gone && carts.splice(i, 1);
		}
		if(carts.length === 1) console.log(`last car is at ${carts[0].x},${carts[0].y}`);
	}
});