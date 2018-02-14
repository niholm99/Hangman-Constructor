var Letter = require('./letter.js');

var Word = function(wrd) {

	this.word = wrd;
	this.letters = [];
	this.wordFound = false;

	this.getLets = function(){
		for (var i = 0; i < this.word.length; i++) {
			var newLetter = new Letter(this.word[i]);
			this.letters.push(newLetter);
		}
	};

	this.findWord = function(){
		if (this.letters.every(function(lttr) {
			return lttr.displayLetter === true;
		})) {
			this.wordFound = true;
			return true;
		}
	};

	this.checkLetter = function (guessedLetter) {
		var returnLet = 0;

		this.letters.forEach(function(lttr){
			if(lttr.letter === guessedLetter) {
				lttr.displayLetter = true;
				returnLet++;
			}
		})
		return returnLet;
	};

	this.wordRender = function(){
		var display = '';
		this.letters.forEach(function(lttr){
			var currentLetter = lttr.letterRender();
			display+= currentLetter;
		});
		return display;
	};
}

module.exports = Word;