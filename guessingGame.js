function generateWinningNumber() {
	return Math.ceil(Math.random() * 100);
}

function shuffle(arr) {
	let end = arr.length, index, store;
	while (end > 0) {
		index = Math.floor(Math.random() * end--);

		store = arr[end];
		arr[end] = arr[index];
		arr[index] = store;
	}
	return arr;
}

function newGame() {
	let game = new Game();
	console.log(game);
	return game;
}

function Game() {
	this.playersGuess = null;
	this.pastGuesses = [];
	this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function() {
	return Math.abs(this.playersGuess - this.winningNumber);
};

Game.prototype.isLower = function() {
	return this.playersGuess < this.winningNumber;
};

Game.prototype.playersGuessSubmission = function(num) {
	if (typeof num !== 'number' || num < 1 || num > 100) {
		throw 'That is an invalid guess.';
	} else {
		this.playersGuess = num;
		return this.checkGuess();
	}
};

Game.prototype.checkGuess = function() {
	let guessDiff = this.difference();
	if (this.winningNumber === this.playersGuess) {
		return 'You Win!';
	} else if (this.pastGuesses.includes(this.playersGuess)) {
		return 'You have already guessed that number.';
	} else if (this.pastGuesses.length === 4) {
		return 'You Lose.';
	} else if (guessDiff < 10) {
		this.pastGuesses.push(this.playersGuess);
		return 'You\'re burning up!';
	} else if (guessDiff < 25 && guessDiff >= 10) {
		this.pastGuesses.push(this.playersGuess);
		return 'You\'re lukewarm.';
	} else if (guessDiff < 50 && guessDiff >= 25) {
		this.pastGuesses.push(this.playersGuess);
		return 'You\'re a bit chilly.';
	} else {
		this.pastGuesses.push(this.playersGuess);
		return 'You\'re ice cold!';
	}
};

Game.prototype.provideHint = function() {
	let hintArray = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
	return shuffle(hintArray);
};


