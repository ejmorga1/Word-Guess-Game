var list = ["seven samurai", "bonnie and clyde", "reservoir dogs", "airplane", "doctor zhivago", "the deer hunter", "close encouters of the third kind", "up", "rocky", "memento", "braveheart", "slumdog millionaire", "lord of the rings", "beauty and the beast", "seven", "inception", "die hard", "amadeus", "on the waterfront", "ghostbusters", "brokeback mountain", "the bridge on the river kwai", "blazing saddles", "young frankenstein", "almost famous", "vertigo", "gladiator", "monty python and the holy grail", "avatar", "the lion king", "raging bull", "mary poppins", "groundhog day", "north by northwest", "west side story", "amelie", "thelma and louise", "sunset blvd", "the dark knight", "eternal sunshine of the spotless mind", "taxi driver", "butch cassidy and the sundance kid", "good will hunting", "the big lebowski", "jurassic park", "rear window", "the usual suspects", "some like it hot", "saving private ryan", "titanic", "the matirx", "toy story", "alien", "psycho", "fight club", "the shining", "when harry met sally", "a clockwork orange", "american beauty", "fargo", "the empire strikes back", "the princess bride", "blade runner", "the breakfast cLub", "the sound of music", "jaws", "lawrence of arabia", "the silence of the lambs", "goodfellas", "annie hall", "apocalyse now", "to kill a mockingbird", "gone with the wind", "forrest gump", "raiders of the lost ark", "back to the future", "star wars", "casablanca", "pulp fiction", "the shawshank redemption", "citizen kane", "the wizard of oz", "the godfather", "get out", "moonlight", "the maltese falcon", "king kong", "alien", "the terminator", "let the right one in", "the manchurian candidate", "casino royale", "evil dead", "zero dark thirty", "goldfinger", "repo man", "lost in translation", "this is spinnal tap", "blade runner", "enchanted", "ghost in the shell", "bridesmaids", "shaun of the dead", "dazed and confused", "boogie nights", "trainspotting", "enter the dragon", "superbad", "shrek", "the exorcist", "edward scissorhands", "robocop", "the sixth sense", "clerks", "mean girls", "lethal weapon", "the thing", "the royal tenebaums", "clueless", "clue", "oldboy", "requiem for a dream", "black hawk down", "it", "american psycho", "reign of fire", "spirited away", "my neighbor totoro", "princess mononoke", "form dusk till dawn", "gravity", "spy kids", "the mask of zorro", "the terminal", "jerry maguire", "the texas chainsaw massacre", "atomic blonde", "cloverfield", ];
var title = list[Math.floor(Math.random() * list.length)];
//var title = "seven samurai";
var titleArray = title.split("");
var playerGuesses = [" "];
var displayed = [];
var solved;
var wins = 0;
var loses = 0;
var chances = 5 + titleArray.length;
var movieTag = document.getElementById("movie");
var guessTag = document.getElementById("guess");

function refresh() {
    title = list[Math.floor(Math.random() * list.length)];
    titleArray = title.split("");
    playerGuesses = [" "];
    displayed = [];
    chances = 5 + titleArray.length;
}

function gameWon() {

    alert("You Won! It was: " + title);
    wins++;
    refresh();
    gameStart();
}

function gameLost() {
    alert("You Lost! The answer was: " + title);
    loses++;
    refresh();
    gameStart();
}

function gameStart() {

    document.getElementById("startGameButton").style.display = "none";

    function playarea(letter) {
        var newDisplayed = [];
        for (i = 0; i < title.length; i++) {
            if (titleArray[i] == " ") {
                newDisplayed.push(" ");
            } else if (titleArray[i] == displayed[i]) {
                newDisplayed.push(titleArray[i]);
            } else if (titleArray[i] == letter) {
                newDisplayed.push(letter);
            } else {
                newDisplayed.push("_");
            }
        }
        displayed = newDisplayed;
        updateDisplay();
    }

    function updateDisplay() {
        movieTag.innerHTML = "";
        for (i = 0; i < displayed.length; i++) {
            var display = document.createElement("span");
            display.textContent = displayed[i];
            movieTag.appendChild(display);
        }
        guessTag.innerHTML = "";
        for (i = 0; i < playerGuesses.length; i++) {
            var display = document.createElement("span");
            display.textContent = playerGuesses[i];
            guessTag.appendChild(display);
        }
    }

    function checkSolved(x) {
        var count = displayed.length;
        for (i = 0; i < count; i++) {
            if (displayed[i] == "_") {
                return false;
            }
        }
        return true;
    }

    document.onkeyup = function (keyPressed) {
        var letter = keyPressed.key.toLowerCase();
        var alreadyGuessed = "";
        for (i = 0; i < playerGuesses.length; i++) {
            if (playerGuesses[i] == letter) {
                alreadyGuessed = letter
            }
        }
        if (alreadyGuessed != letter) {
            playerGuesses.push(letter);
        }
        playarea(letter);
        updateDisplay();
        solved = checkSolved();
        if (solved === true) {
            gameWon();
            return false
        } else if (playerGuesses.length > chances) {
            gameLost();
            return false
        }
    }

    playarea(" ");

}