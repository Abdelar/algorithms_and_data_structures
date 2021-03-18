'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
	inputString += inputStdin;
});

process.stdin.on('end', function () {
	inputString = inputString
		.replace(/\s*$/, '')
		.split('\n')
		.map(str => str.replace(/\s*$/, ''));

	main();
});

function readLine() {
	return inputString[currentLine++];
}

// Complete the substrCount function below.
function substrCount(_, s) {
	let l = [];
	let curr;
	let res = 0;
	for (const c of s) {
		if (c != curr) {
			l.push([c, 1]);
		} else {
			l[l.length - 1][1]++;
		}
		curr = c;
	}
	for (let m of l) {
		res += ((m[1] + 1) * m[1]) / 2;
	}
	for (let i = 1; i < l.length - 1; i++) {
		if (l[i - 1][0] == l[i + 1][0] && l[i][1] == 1) {
			res += Math.min(l[i - 1][1], l[i + 1][1]);
		}
	}
	return res;
}

function main() {
	const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

	const n = parseInt(readLine(), 10);

	const s = readLine();

	const result = substrCount(n, s);

	ws.write(result + '\n');

	ws.end();
}
