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

const SinglyLinkedListNode = class {
	constructor(nodeData) {
		this.data = nodeData;
		this.next = null;
	}
};

const SinglyLinkedList = class {
	constructor() {
		this.head = null;
		this.tail = null;
	}

	insertNode(nodeData) {
		const node = new SinglyLinkedListNode(nodeData);

		if (this.head == null) {
			this.head = node;
		} else {
			this.tail.next = node;
		}

		this.tail = node;
	}
};

function printSinglyLinkedList(node, sep, ws) {
	while (node != null) {
		ws.write(String(node.data));

		node = node.next;

		if (node != null) {
			ws.write(sep);
		}
	}
}

// Complete the mergeLists function below.

/*
 * For your reference:
 *
 * SinglyLinkedListNode {
 *     int data;
 *     SinglyLinkedListNode next;
 * }
 *
 */
function mergeLists(n1, n2) {
	if (!n1 && !n2) return null;
	if (!n1) return n2;
	if (!n2) return n1;

	let n;
	if (n1.data <= n2.data) {
		n = n1;
		n1.next = mergeLists(n1.next, n2);
	} else {
		n = n2;
		n2.next = mergeLists(n1, n2.next);
	}
	return n;
}

function main() {
	const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

	const tests = parseInt(readLine(), 10);

	for (let testsItr = 0; testsItr < tests; testsItr++) {
		const llist1Count = parseInt(readLine(), 10);

		let llist1 = new SinglyLinkedList();

		for (let i = 0; i < llist1Count; i++) {
			const llist1Item = parseInt(readLine(), 10);
			llist1.insertNode(llist1Item);
		}

		const llist2Count = parseInt(readLine(), 10);

		let llist2 = new SinglyLinkedList();

		for (let i = 0; i < llist2Count; i++) {
			const llist2Item = parseInt(readLine(), 10);
			llist2.insertNode(llist2Item);
		}

		let llist3 = mergeLists(llist1.head, llist2.head);

		printSinglyLinkedList(llist3, ' ', ws);
		ws.write('\n');
	}

	ws.end();
}
