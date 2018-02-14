var inquirer = require('inquirer')
var isLetter = require('is-letter')

var Word = require('./word.js')
var Game = require('./game.js')

//var hangManDisplay = Game.newWord.hangman;

var wordBank = Game.newWord.wordList
var guessesRemaining = 10;
var guessedLetters = [];
var display = 0;
var currentWord

startGame()

function startGame() {
	console.log('---------------')
	console.log('')
	console.log('Lets play hangman!')
	console.log('')
	console.log('---------------')

	if (guessedLetters.length > 0){
		guessedLetters = []
	}

	inquirer.prompt([
		{
			name:'play',
			type: 'confirm',
			message:'Ready to start?'
		}
	]).then(function(answer){
		if (answer.play){
			console.log('')
			console.log('You get 10 tries to guess the beer.')
			console.log('Prost!')
			newGame()
		} else{
			console.log('auf wiedersehen')
		}
	})
}

function newGame() {
	if(guessesRemaining ===10){
		console.log('-----------')
		var randNum = Math.floor(Math.random()*wordBank.length)
		currentWord = new Word(wordBank[randNum])
		currentWord.getLets()

		console.log('')
		console.log(currentWord.wordRender())
		console.log('')
		promptUser()
		}else{
			resetGuessesRemaining()
			newGame()
		}
	}

	function resetGuessesRemaining(){
		guessesRemaining = 10;
	}

	function promptUser() {
		inquirer.prompt([
		{
			name: 'chosenLetter',
			type: 'input',
			message: 'choose a letter',
			validate: function(value){
				if (isLetter(value)) {
					return true;
				} else{
					return false;
				}
			}
		}
		]).then(function(lttr){
			var letterReturned = (lttr.chosenLetter).toUpperCase()

			var guessedAlready = false;
			for (var i = 0; i < guessedLetters.length; i++) {
				if(letterReturned === guessedLetters[i]){
					guessedAlready = true;
				}
			}

			if (guessedAlready === false) {
				guessedLetters.push(letterReturned)

				var found = currentWord.checkLetter(letterReturned)

				if (found === 0) {
					console.log('sorry wrong guess!')

					guessesRemaining--

					display++

				console.log('Guesses reamaining: ' + guessesRemaining)
               // console.log(hangManDisplay[display - 1]) 

                console.log('-----------------------------------------------')
                console.log('')
                console.log(currentWord.wordRender())
                console.log('')
                console.log('----------------------------------------------')
                console.log('Letters guessed: ' + guessedLetters)
            } else {
                console.log('You are correct!')

                if (currentWord.findWord() === true) {
                    console.log('')
                    console.log(currentWord.wordRender())
                    console.log('')
                    console.log('----- YOU WIN! Cheers!-----')
                    startGame()  
                } else {
                    console.log('Guesses remaining: ' + guessesRemaining)
                    console.log('')
                    console.log(currentWord.wordRender())
                    console.log('')
                    console.log('---------------------------------------------------------')
                    console.log('Letters guessed: ' + guessedLetters)
                	}
				}

				if (guessesRemaining > 0 && currentWord.wordFound === false) {
					promptUser();
				} else if (guessesRemaining === 0){
					console.log('')
					console.log('---Game Over---')
					console.log('')
					console.log('The word you were trying to guess was: '+ currentWord.word)
					console.log('')
				}
				} else{
					console.log("You've guessed that letter already.")
					promptUser();
				}
		})
	}

