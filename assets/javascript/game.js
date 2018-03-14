// First things first, going to be setting my variable somewhere down here
  var wins = 0;
  var losses = 0;
  var words = ["Abandon Ship", "Johnny Depp", "Jack Sparrow", "Black Pearl", "Parley", "City of Gold", "Davy Jones Locker", "Mutiny", "Booty", "Pirates of the Caribbean", "Tortuga", "Savvy", "Walk the Plank", "Sea of Thiefs", "Motley Crew", "Black Flag", "Above Deck", "Rum", "Barbossa", "Elizabeth Swann", "William Turner", "Murtogg", "Jolly Roger", "Scallywag", "Yo Ho Yo Ho", "Scurvy Dog"]
  //Let's split the alphabet and the letters
  var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  var currentWord;
  var currentLetter = [];
  var lettersGuessed = [];
  var incorrect;

// Let's get the entire page loaded before we get to the functions
window.onload = function() {
    setUpRound();
  }

  function setUpRound() {
    var wordContainer = document.getElementById("the-word"); 
    wordContainer.innerHTML = "";
    document.getElementById("past-guesses").innerHTML = '';
  
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("endgame").removeAttribute('style');
    document.getElementById("score").removeAttribute('style');
  
    //Using the Math Object to get random number from the array
    currentWord = words[Math.floor(Math.random() * words.length)].toLowerCase(); 
    //Splitting word up into an array of letters
    currentLetter = currentWord.split("");
    //Guessed letters can go in here 
    LettersGuessed = []; 
    //Incorrect guesses
    incorrect = 10; 
  
    document.getElementById("incorrect").innerHTML = incorrect;
  
    for ( i = 0; i < currentLetter.length; i++ ) {
      var tile = document.createElement("span");
      tile.className = currentLetter[i] + ' nay';
      if ( currentLetter[i] == " " ) {
        tile.className = "space yep"; 
      } 
      tile.innerHTML = "<b>" + currentLetter[i] + "</b>";
      wordContainer.appendChild(tile); 
    } 
}
  
  function lookUp() {
    if(incorrect > 0) {
      var event = window.event;
      var inputLetter = event.key;
  
      if(alphabet.indexOf(inputLetter) > -1) { 
  
        var used = LettersGuessed.indexOf(inputLetter);
  
        if ( used === -1 ) {
          LettersGuessed.push(inputLetter);
          var history = LettersGuessed.join(" ");
          document.getElementById("past-guesses").innerHTML = history;
  
          if ( currentLetter.indexOf(inputLetter) > -1 ) {
            var spans = document.getElementsByClassName(inputLetter);
  
            for ( i = 0; i < spans.length; i++ ) {
              var classes = inputLetter + " yep";
              spans[i].className = classes;
            } 

            var remainingLetters = document.getElementsByClassName("nay");
            if ( remainingLetters.length == 0 ) {
              wins = wins + 1;
              document.getElementById("wins").innerHTML = wins;
              document.getElementById("score").style.display = "block";
                countDown();
            }
  
        } 
          else {
            incorrect = incorrect - 1;
            document.getElementById("incorrect").innerHTML = incorrect;
            if ( incorrect == 0 ) {
              document.getElementById("endgame").style.display = "block";
              losses = losses + 1;
              document.getElementById("losses").innerHTML = losses;
              countDown();
  
            }
          }
  
        }
      }
    }
  }
    // Start next round within 2 seconds
  function countDown() {
    var counter = 0;
    var id;
  
    id = setInterval(function() {
        counter--;
        if(counter < 1) {
          countDown.innerHTML = '';
          setUpRound();
          clearInterval(id);
        }
    }, 2000);
}