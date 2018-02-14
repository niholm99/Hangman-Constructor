var Letter = function(lttr){
	this.letter = lttr;
	this.displayLetter = false;

	this.letterRender = function() {
    if(this.letter == ' '){ 
      this.displayLetter = true;
      return '  ';
    }if(this.displayLetter === false){ 
      return ' _ ';
    } else{ 
      return this.letter;
    }

  };
};

	
module.exports = Letter;
