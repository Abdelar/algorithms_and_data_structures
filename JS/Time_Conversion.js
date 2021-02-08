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
		.trim()
		.split('\n')
		.map(str => str.trim());

	main();
});

function readLine() {
	return inputString[currentLine++];
}

/*
 * Complete the timeConversion function below.
 */
function timeConversion(s) {
	let hours = +s.substring(0, 2);
	if (s.substring(s.length - 2) === 'PM' && hours !== 12)
		hours = ((hours % 12) + 12).toString().padStart(1, '0');
	if (s.substring(s.length - 2) === 'AM' && hours === 12) hours = '00';
	return hours.toString().padStart(2, '0') + s.substring(2, s.length - 2);
}

function main() {
	const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

	const s = readLine();

	let result = timeConversion(s);

	ws.write(result + '\n');

	ws.end();
}
