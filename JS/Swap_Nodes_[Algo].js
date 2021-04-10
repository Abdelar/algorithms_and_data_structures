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

/**
 * class Node
 * @parameter {Number}  data which the present node carry
 * @parameter {Node}  left the left node
 * @parameter {Node}  right the right node
 */
class Node {
	constructor(data) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}

/**
 *  Return a constructed array from an inorder traversal of the given tree
 * @param {Node} node the root of a given tree
 * @param {Array} arr the result array
 * @return {Array}  the result array
 */
function treeToArray(node, arr = []) {
	if (node) {
		treeToArray(node.left, arr);
		arr.push(node.data);
		treeToArray(node.right, arr);
	}
	return arr;
}

/**
 * assign depth to each node of the given tree
 * @param {Node} node the tree
 */
function assignDepth(node, level = 1) {
	if (!node) {
		return;
	}
	node.depth = level;
	assignDepth(node.left, level + 1);
	assignDepth(node.right, level + 1);
}

/**
 * construct a binary tree from the missy array given in this challenge and return the root of that tree
 * @param {Array} arr the array from which the tree is constructed
 * @return {Node}     the root node of the tree
 */
function treeFrom(arr) {
	const root = new Node(1);
	const q = [root];
	arr.forEach(([l, r]) => {
		const aux = q.shift();
		if (l != -1) {
			const left = new Node(l);
			aux.left = left;
			q.push(left);
		}
		if (r != -1) {
			const right = new Node(r);
			aux.right = right;
			q.push(right);
		}
	});
	return root;
}

/*
 * Complete the swapNodes function below.
 */
function swapNodes(indexes, queries) {
	const tree = treeFrom(indexes);
	assignDepth(tree);
	const res = [];
	queries.forEach(query => {
		const q = [tree];
		while (q.length) {
			const aux = q.shift();
			if (!(aux.depth % query)) {
				[aux.left, aux.right] = [aux.right, aux.left];
			}
			q.push(...[aux.left, aux.right].filter(el => el));
		}
		res.push(treeToArray(tree));
	});
	return res;
}

function main() {
	const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

	const n = parseInt(readLine(), 10);

	let indexes = Array(n);

	for (let indexesRowItr = 0; indexesRowItr < n; indexesRowItr++) {
		indexes[indexesRowItr] = readLine()
			.split(' ')
			.map(indexesTemp => parseInt(indexesTemp, 10));
	}

	const queriesCount = parseInt(readLine(), 10);

	let queries = [];

	for (let queriesItr = 0; queriesItr < queriesCount; queriesItr++) {
		const queriesItem = parseInt(readLine(), 10);
		queries.push(queriesItem);
	}

	let result = swapNodes(indexes, queries);

	ws.write(result.map(x => x.join(' ')).join('\n') + '\n');

	ws.end();
}
