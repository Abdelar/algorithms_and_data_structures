'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
	inputString += inputStdin;
});

process.stdin.on('end', _ => {
	inputString = inputString
		.replace(/\s*$/, '')
		.split('\n')
		.map(str => str.replace(/\s*$/, ''));

	main();
});

function readLine() {
	return inputString[currentLine++];
}

// Complete the abbreviation function below.
function abbreviation(a, b) {
	let m = a.length,
		n = b.length;
	return rec(m, n) ? 'YES' : 'NO';

	function rec(i, j, memo = {}) {
		const hash = encode(i, j);
		if (hash in memo) return memo[hash];
		// initialization
		if (i && !j) {
			return a.slice(0, i).isLowerCase() ? true : false;
		}
		if (i < j) return false;
		if (!i && !j) return true;

		// recursion
		const x = a[i - 1];
		const y = b[j - 1];

		if (x.isUpperCase()) {
			memo[hash] = x.isEqual(y) ? rec(i - 1, j - 1, memo) : false;
		} else {
			memo[hash] = x.isEqual(y)
				? rec(i - 1, j, memo) || rec(i - 1, j - 1, memo)
				: rec(i - 1, j, memo);
		}
		return memo[hash];
	}
}

function encode(i, j) {
	return i + '_' + j;
}

String.prototype.isEqual = function (c) {
	return this.toLowerCase() == c.toLowerCase();
};

String.prototype.isUpperCase = function () {
	return this == this.toUpperCase();
};

String.prototype.isLowerCase = function () {
	return this == this.toLowerCase();
};

function main() {
	const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

	const q = parseInt(readLine(), 10);

	for (let qItr = 0; qItr < q; qItr++) {
		const a = readLine();

		const b = readLine();

		let result = abbreviation(a, b);

		ws.write(result + '\n');
	}

	ws.end();
}
