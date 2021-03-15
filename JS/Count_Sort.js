function countSort(arr) {
	const max = Math.max(...arr);
	const n = arr.length;
	const count = Array(max + 1).fill(0);

	for (let i = 0; i < n; i++) {
		count[arr[i]]++;
	}

	for (let i = 1; i <= max; i++) {
		count[i] = count[i] + count[i - 1];
	}

	const temp = [];
	for (let i = 0; i < n; i++) {
		temp[--count[arr[i]]] = arr[i];
	}

	for (let i = 0; i < n; i++) {
		arr[i] = temp[i];
	}

	return arr;
}

console.log(countSort([1, 2, 4, 3, 100, 50]));
