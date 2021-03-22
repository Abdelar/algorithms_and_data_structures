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

// Complete the triplets function below.
function triplets(a, b, c) {
	a = [...new Set(a)].sort((a, b) => a - b);
	b = [...new Set(b)].sort((a, b) => a - b);
	c = [...new Set(c)].sort((a, b) => a - b);
	let count = 0;
	let i = 0,
		j = 0,
		k = 0;
	while (j < b.length) {
		while (i < a.length) {
			if (a[i] <= b[j]) i++;
			else break;
		}
		while (k < c.length) {
			if (c[k] <= b[j]) k++;
			else break;
		}
		count += i * k;
		j++;
	}
	return count;
}

function main() {
	const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

	const lenaLenbLenc = readLine().split(' ');

	const lena = parseInt(lenaLenbLenc[0], 10);

	const lenb = parseInt(lenaLenbLenc[1], 10);

	const lenc = parseInt(lenaLenbLenc[2], 10);

	const arra = readLine()
		.split(' ')
		.map(arraTemp => parseInt(arraTemp, 10));

	const arrb = readLine()
		.split(' ')
		.map(arrbTemp => parseInt(arrbTemp, 10));

	const arrc = readLine()
		.split(' ')
		.map(arrcTemp => parseInt(arrcTemp, 10));

	const ans = triplets(arra, arrb, arrc);

	ws.write(ans + '\n');

	ws.end();
}
