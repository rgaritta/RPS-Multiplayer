var config = {
    apiKey: "AIzaSyCXrEsIs6vHJtgInlRC-nV_k9VOEgftcog",
    authDomain: "rpsm-cc460.firebaseapp.com",
    databaseURL: "https://rpsm-cc460.firebaseio.com",
    projectId: "rpsm-cc460",
    storageBucket: "rpsm-cc460.appspot.com",
    messagingSenderId: "325224256219"
};

firebase.initializeApp(config);
var database = firebase.database();


var game = {

    options: ["Rock", "Paper", "Scissors"],
    wins: 1,
    losses: 0,
    ties: 0,

    drawButtons: function () {
        for (var i = 0; i < this.options.length; i++) {
            var button = $('<button>' + this.options[i] + '</button>').addClass("choice");
            $('#buttons').append(button);
        }
    },



    }


    game.drawButtons();

console.log(game.wins);

    // This function is run whenever the user presses a key.
    document.onkeyup = function (event) {

        // Determines which key was pressed.
        var userGuess = event.key;



        // Randomly chooses a choice from the options array. This is the Computer's guess.
        var computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];

        $("#you").text(userGuess);
        $("#comp").text(computerGuess);

        // Alerts the key the user pressed (userGuess).
        if (computerChoices.indexOf(userGuess) != -1) {
            if (userGuess == computerGuess) {
                ties++;
                //document.getElementById("chose").innerHTML = "

            }
            else if (userGuess == 'r' && computerGuess == 'p') {
                losses++;
            }
            else if (userGuess == 'r' && computerGuess == 's') {
                wins++;

            }
            else if (userGuess == 'p' && computerGuess == 's') {
                losses++;
            }
            else if (userGuess == 'p' && computerGuess == 'r') {
                wins++;

            }
            else if (userGuess == 's' && computerGuess == 'r') {
                losses++;
            }
            else if (userGuess == 's' && computerGuess == 'p') {
                wins++;
            }
        }

        document.getElementById("wins").innerHTML = wins;
        document.getElementById("losses").innerHTML = losses;
        document.getElementById("ties").innerHTML = ties;


    };