/**
 * Shuffle an array to random order using Fisher-Yates algorithm
 * https://javascript.info/task/shuffle
 * @param {array} arr array to be shuffle
 * @returns {array} Shuffled array
 */
module.exports.shuffleArray = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		// get random index from 0 to i
		let j = Math.floor(Math.random() * (i + 1));

		// destructuring assignment
		// can also written as
		// let temp = array[i]; array[i] = array[j]; array[j] = temp
		[array[i], array[j]] = [array[j], array[i]];
	}

	return array;
};
