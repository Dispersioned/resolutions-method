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
		result = '';
		for (char of chars) {
			result += char;
		}
	}
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

function resolve(arr) {
	let i = 0;
	let curLength, newLength;

	while (true) {
		console.log(arr);
		curLength = arr.length;
		arr = iterate(arr);
		newLength = arr.length;

		if (curLength === newLength) {
			break;
		}

		i++;
		if (i > 7) break;
	}

	console.log('no new items can be created');
	console.log('Start arr: ', arrCopy);
	console.log('current arr: ', arr);
	// resolve(newArr);
	// return arr
}

let input = 'BD -C-D A-D -ACD AB -A-B';
let arr = input.split(' '); // result should be 'B'
let arrCopy = [...arr];
resolve(arr);
