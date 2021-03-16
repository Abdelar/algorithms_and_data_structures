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

// Median helper function
function median(count, d) {
	let k1 = Math.floor((d - 1) / 2),
		k2 = Math.ceil((d - 1) / 2);
	let m1, m2;
	for (let i = 0, k = 0; k <= k1; k += count[i], i++) m1 = i;
	for (let i = 0, k = 0; k <= k2; k += count[i], i++) m2 = i;
	return (m1 + m2) / 2;
}

// Complete the activityNotifications function below.
function activityNotifications(arr, d) {
	let res = 0;
	const count = Array(201).fill(0);
	for (let i = 0; i < d; i++) {
		count[arr[i]]++;
	}
	//main for loop
	for (let i = d; i < arr.length; i++) {
		if (arr[i] >= median(count, d) * 2) res++;
		count[arr[i]]++;
		count[arr[i - d]]--;
	}
	return res;
}

function main() {
	const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

	const nd = readLine().split(' ');

	const n = parseInt(nd[0], 10);

	const d = parseInt(nd[1], 10);

	const expenditure = readLine()
		.split(' ')
		.map(expenditureTemp => parseInt(expenditureTemp, 10));

	let result = activityNotifications(expenditure, d);

	ws.write(result + '\n');

	ws.end();
}
