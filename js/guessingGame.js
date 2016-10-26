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
	console.log(game.winningNumber);
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
	if (isNaN(num) || num < 1 || num > 100) {
		$('h1').text('That is an invalid guess.');
	} else {
		this.playersGuess = num;
		return this.checkGuess();
	}
};

Game.prototype.checkGuess = function() {
	let guessDiff = this.difference();
	if (this.winningNumber === this.playersGuess) {
		$('h1').text('You Win!');
		disableButtons(true);
	}
	else {
		if (this.pastGuesses.includes(this.playersGuess)) {
			$('h1').text('You have already guessed that number.');
		}
		else {
			this.pastGuesses.push(this.playersGuess);
			$('#guess-list li:nth-child(' + this.pastGuesses.length + ')').text(this.playersGuess);
			if (this.pastGuesses.length === 5) {
				$('h1').text('You Lose.');
				disableButtons(true);
			}
			else {
				if (guessDiff < 10) {
					$('h1').text('You\'re burning up!');
				} else if (guessDiff < 25 && guessDiff >= 10) {
					$('h1').text('You\'re lukewarm.');
				} else if (guessDiff < 50 && guessDiff >= 25) {
					$('h1').text('You\'re a bit chilly.');
				} else {
					$('h1').text('You\'re ice cold!');
				}
			}
		}
	}
};

Game.prototype.provideHint = function() {
	let hintArray = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
	return shuffle(hintArray);
};

function disableButtons(bool) {
	$('#submit, #hint').attr('disabled', bool);
}

function submitGuess(game) {
	let guess = +$('#players-input').val();
		game.playersGuessSubmission(guess);
		$('#players-input').val('');
}

$(document).ready(function() {

	let game = newGame();

	$('#submit').click(function() {
		submitGuess(game);
	});

	$('#reset').click(function() {
		game = newGame();
		disableButtons(false);
		$('#guess-list').children('li').text('-');
	});

	$('#players-input').keypress(function(event) {
		if (event.which === 13) {
			submitGuess(game);
		}
	});

});