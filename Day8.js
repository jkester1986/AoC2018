fs = require('fs');
fs.readFile('Day8.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let mainHeader = data.split(' ').map(Number);

	let tree = {},
		metaTotal = 0;

	let getMetaTotal = (start, amount) => {
		let end = start + amount,
			meta = 0;
		for (let i = start; i < end; i++) {
			meta += mainHeader[i];
		}
		return meta;
	}
	let getMetaValues = (start, amount) => {
		let end = start + amount,
			meta = new Array();
		for (let i = start; i < end; i++) {
			meta.push(mainHeader[i]);
		}
		return meta;
	}

	let findNodes = (start) => {
		tree[`${start}`] = {};
		let childrenCount = mainHeader[start],
			metaCount = mainHeader[start+1];

		if (childrenCount > 0) {//has children
			//find # siblings, then go through each of them
			tree[`${start}`].children = new Array();
			let nodeLength = 2;

			for (let i = 0; i < childrenCount; i++) {
				tree[`${start}`].children.push(start+nodeLength);
				nodeLength += findNodes(start + nodeLength);
			}

			tree[`${start}`].metaVals = getMetaValues(start+nodeLength, metaCount);
			metaTotal += getMetaTotal(start + nodeLength, metaCount);
			//do this separate bc we are going to use the nodeLength to determine starting position of each child
			nodeLength += metaCount;
			return nodeLength;
		}
		else {//we're at a leaf
			let nodeLength = 2 + metaCount,
				meta = getMetaTotal(start+2, metaCount);
			metaTotal += meta;
			tree[`${start}`].value = meta;//this is for p2 to make life easier

			return nodeLength;
		}
	}

	findNodes(0);

	console.log("P1:", metaTotal);

	let getValue = node => {
		if (node.value) return node.value;
		//otherwise, they have children and we don't know the value yet
		let totValue = 0,
			numChildren = node.children.length;
		node.metaVals.forEach(val => {
			if(val > 0 && val <= numChildren) {
				totValue += getValue(tree[`${node.children[val-1]}`]);
			}
		});
		node.value = totValue;
		return totValue;
	}

	console.log("P2:", getValue(tree['0']));
});