function formatDots(x) {
	let length = x.length;
	let i = 0;
	let result = '';
	while (length !== 0) {
		let char = x[i];
		if (char === '-') {
			char = `-${x[i + 1]}`;
			i++;
			length--;
		}
		result += char + '.';
		i++;
		length--;
	}
	return result.slice(0, result.length - 1);
}

function compareAndGetItem(x, y) {
	x = formatDots(x).split('.');
	y = formatDots(y).split('.');
	let ANTIes = 0;
	let charForRemove;
	for (let i = 0; i < x.length; i++) {
		// console.log('i', i);
		if (x[i][0] === '-') {
			if (y.includes(x[i][1])) {
				ANTIes++;
				charForRemove = x[i];
			}
		}
		if (x[i][0] !== '-') {
			if (y.includes('-' + x[i])) {
				ANTIes++;
				charForRemove = x[i];
			}
		}
	}
	// console.log('ANTIes ', ANTIes);
	let result = 'none';
	if (ANTIes === 1) {
		// delete '-' from charToRemove
		charForRemove = charForRemove[0] === '-' ? charForRemove[1] : charForRemove;

		let chars = new Set();

		for (char of x) {
			if (char !== charForRemove && char !== '-' + charForRemove) {
				chars.add(char);
			}
		}
		for (char of y) {
			if (char !== charForRemove && char !== '-' + charForRemove) {
				chars.add(char);
			}
		}
		// let sortedResultChars = chars.values().
		let haveMinuses = new Map();
		for (char of chars) {
			if (char[0] === '-') {
				haveMinuses.set(char[1], 1);
			} else {
				haveMinuses.set(char, 0);
			}
		}
		console.log([...haveMinuses.keys()]);
		let sortedChars = [...haveMinuses.keys()].sort();

		result = '';
		for (char of sortedChars) {
			if (haveMinuses.get(char) === 1) {
				result += '-' + char;
			} else {
				result += char;
			}
		}
	}
	// console.log('result of new item is: ', result);
	return result;
}

function iterate(arr) {
	let length = arr.length;
	for (let i = 0; i < length - 1; i++) {
		for (let j = i + 1; j < length; j++) {
			console.log('items: ', arr[i], ' ', arr[j]);
			let newItem = compareAndGetItem(arr[i], arr[j]);
			if (arr.includes(newItem)) {
				newItem = 'none';
			}
			console.log('newItem ', newItem);
			if (newItem !== 'none') {
				arr.push(newItem);
				return arr;
			}
		}
	}
	return arr;
}

function resolve(arr, safe = 1) {
	let i = 0;
	let curLength, newLength;

	while (true) {
		// arr.map((item) => {
		// 	item = item.split('').sort().join('');
		// 	console.log(item);
		// 	return item;
		// });
		// console.log('sorted arr: ', arr);
		console.log('arr: ', arr);

		curLength = arr.length;
		arr = iterate(arr);
		newLength = arr.length;

		if (curLength === newLength) {
			break;
		}

		i++;
		if (i > 15 && safe) {
			for (let i = 0; i < 5; i++) {
				console.log('BREAKING SAFE');
			}
			break
		};
	}

	console.log('no new items can be created');
	console.log('Start arr: ', arrCopy);
	console.log('current arr: ', arr);
	for (item of arr) {
		// if (item.length === 1 || (item.length === 2 && item[0] === '-')) {
		// 	console.log(item);
		// }
	}
	// resolve(newArr);
	// return arr
}

// let input = '-A-BCD AB A-D B-C -C-D -AB A-B';
let input = '-AD AC DE B-D C D';
let arr = input.split(' '); // result should be 'B'
let arrCopy = [...arr];
resolve(arr, (safe = 0));
