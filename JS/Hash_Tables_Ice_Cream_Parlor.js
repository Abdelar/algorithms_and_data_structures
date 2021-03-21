'use strict';

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

// Complete the whatFlavors function below.
function whatFlavors(cost, money) {
	cost = cost.map((el, i) => [i, el]).sort((a, b) => a[1] - b[1]);
	let i = 0,
		j = cost.length - 1;
	while (true) {
		const diff = cost[i][1] + cost[j][1];
		if (diff == money) {
			console.log(
				[cost[i][0] + 1, cost[j][0] + 1].sort((a, b) => a - b).join(' ')
			);
			return;
		} else {
			if (diff < money) i++;
			else j--;
		}
	}
}

function main() {
	const t = parseInt(readLine(), 10);

	for (let tItr = 0; tItr < t; tItr++) {
		const money = parseInt(readLine(), 10);

		const n = parseInt(readLine(), 10);

		const cost = readLine()
			.split(' ')
			.map(costTemp => parseInt(costTemp, 10));

		whatFlavors(cost, money);
	}
}
