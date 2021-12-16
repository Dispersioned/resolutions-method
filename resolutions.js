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
			let newItem = compareAndGetItem(arr[i], arr[j]);
			// console.log('current array state: ', arr);
			if (arr.includes(newItem)) {
				newItem = 'none';
			}
			if (newItem !== 'none') {
				console.log('items: ', arr[i], ' ', arr[j]);
				console.log('newItem ', newItem);
			}
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
		// console.log('arr: ', arr);

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
			break;
		}
	}

	console.log('no new items can be created');
	console.log('Start arr: ', arrCopy);
	console.log('current arr: ', arr);
}

// ? Вводить дизьюнкты в ЛЕКСИКОГРАФИЧЕСКОМ порядке
let input;
// 18.1doc1 (НЕ) ДОКАЗУЕМО
// input = '-A-BCD AB A-D B-C -C-D -AB A-B';
// input = '-A-BCD AB A-D B-C -C-D -A-B AB'; // reverse
// 18.1doc2 НЕ ДОКАЗУЕМО
// input = '-A-BCD AB A-D B-C -C-D C-D -CD';
// input = '-A-BCD AB A-D B-C -C-D CD -C-D'; // reverse
// 18.2doc1 НЕ ДОКАЗУЕМО
// input = 'AB-C BC-D -A -B';

// 18.2doc2 НЕ ДОКАЗУЕМО
// input = 'AB-C BC-D D';
// 18.3doc1 НЕ ДОКАЗУЕМО
// input = '-AD AC DE B-D AB A B -E';
// 18.3doc2 // НЕ ДОКАЗУЕМО
// input = '-AD AC DE B-D -C-D';

// input = '-AD AC DE B-D AB -A-BE';

let arr = input.split(' ');
let arrCopy = [...arr];
resolve(arr, 0);
