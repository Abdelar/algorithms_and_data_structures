function processData(input) {
	// extract data
	input = input.split('\n').map(el => el.split(' '));
	input.shift();

	// construct the data structure
	class Queue {
		constructor() {
			this.arr = [];
		}
		put(a) {
			return this.arr.unshift(a);
		}
		pop(a) {
			return this.arr.pop(a);
		}
		peek() {
			console.log(this.arr[this.arr.length - 1]);
		}
	}

	// process data
	const q = new Queue();
	input.forEach(([op, num]) => {
		switch (op) {
			case '1':
				q.put(num);
				break;
			case '2':
				q.pop();
				break;

			case '3':
				q.peek();
		}
	});
}

process.stdin.resume();
process.stdin.setEncoding('ascii');
_input = '';
process.stdin.on('data', function (input) {
	_input += input;
});

process.stdin.on('end', function () {
	processData(_input);
});
