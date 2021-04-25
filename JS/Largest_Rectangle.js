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

// Complete the largestRectangle function below.
function largestRectangle(h) {
	let maxArea = 0;
	let stack = [];

	for (let i = 0; i < h.length; i++) {
		let start = i;
		while (stack.length && stack[stack.length - 1].height > h[i]) {
			const { index, height } = stack.pop();
			maxArea = Math.max(maxArea, height * (i - index));
			start = index;
		}
		stack.push({ index: start, height: h[i] });
	}

	stack.forEach(({ index, height }) => {
		maxArea = Math.max(maxArea, height * (h.length - index));
	});
	return maxArea;
}

function main() {
	const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

	const n = parseInt(readLine(), 10);

	const h = readLine()
		.split(' ')
		.map(hTemp => parseInt(hTemp, 10));

	let result = largestRectangle(h);

	ws.write(result + '\n');

	ws.end();
}
