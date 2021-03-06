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

// Complete the minTime function below.
function minTime(machines, goal) {
	let l = (goal / machines.length) * Math.min(...machines);
	let u = (goal / machines.length) * Math.max(...machines);
	while (l < u) {
		let m = Math.floor((l + u) / 2);
		let d = machines.reduce((d, curr) => d + Math.floor(m / curr), 0);
		if (d < goal) {
			l = m + 1;
		} else {
			u = m;
		}
	}
	return l;
}

function main() {
	const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

	const nGoal = readLine().split(' ');

	const n = parseInt(nGoal[0], 10);

	const goal = parseInt(nGoal[1], 10);

	const machines = readLine()
		.split(' ')
		.map(machinesTemp => parseInt(machinesTemp, 10));

	const ans = minTime(machines, goal);

	ws.write(ans + '\n');

	ws.end();
}
