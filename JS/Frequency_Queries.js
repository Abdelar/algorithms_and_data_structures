'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
	inputString += inputStdin;
});

process.stdin.on('end', function () {
	inputString = inputString.split('\n');

	main();
});

function readLine() {
	return inputString[currentLine++];
}

function freqQuery(queries) {
	const repeated = {};
	const frequency = {};
	const res = [];
	queries.forEach(([operation, num]) => {
		switch (operation) {
			case 1:
				repeated[frequency[num]]--;
				frequency[num] = (frequency[num] || 0) + 1;
				repeated[frequency[num]] = (repeated[frequency[num]] || 0) + 1;
				break;
			case 2:
				if (frequency[num]) {
					repeated[frequency[num]]--;
					frequency[num]--;
					repeated[frequency[num]] = (repeated[frequency[num]] || 0) + 1;
				}
				break;
			case 3:
				if (repeated[num]) res.push(1);
				else res.push(0);
		}
	});
	return res;
}

function main() {
	const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

	const q = parseInt(readLine().trim(), 10);

	let queries = Array(q);

	for (let i = 0; i < q; i++) {
		queries[i] = readLine()
			.replace(/\s+$/g, '')
			.split(' ')
			.map(queriesTemp => parseInt(queriesTemp, 10));
	}

	const ans = freqQuery(queries);

	ws.write(ans.join('\n') + '\n');

	ws.end();
}
