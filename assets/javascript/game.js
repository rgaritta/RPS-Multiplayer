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

// Presence list and userID
var connectedRef = database.ref(".info/connected");
var connectionsRef = database.ref("/connections");
var playernum = 0;






database.ref().once("value", function (snap) {


    if (snap.numChildren() == 0) {
        database.ref('player1').update({ 'player1': snap.numChildren() + 1, name: 'Enter your name', choice: 1 });
        $('#buttons2').hide();
    }
    else if (snap.numChildren() == 1) {
        database.ref('player2').update({ 'player2': snap.numChildren() + 1, name: 'Waiting for player 2...', choice: 2 });
        $('#buttons1').hide();
    }
    else if (snap.numChildren() > 1) {
        document.write('<h1> There are already two players</h1>');
    }

    playernum = snap.numChildren() + 1;

    database.ref('player' + playernum).onDisconnect().remove();

    $("#connected-viewers").text(snap.numChildren() + 1);

});

$("#submit-name").on("click", function (event) {
    event.preventDefault();
    playername = $('#name').val();
    database.ref('player' + playernum).update({ name: playername });


});


database.ref().on("value", function (snap) {



    $('#player-1-name').html(snap.child('player1').child('name').val());
    $('#player-2-name').html(snap.child('player2').child('name').val());

    game.drawButtons((snap.numChildren() + 1));

    console.log(snap.child('player1').child('choice').val());




});



var game = {

    options: ["Rock", "Paper", "Scissors"],
    wins: 0,
    losses: 0,
    ties: 0,

    drawButtons: function (num) {
        for (var i = 0; i < this.options.length; i++) {
            var button = $('<button>' + this.options[i] + '</button>').addClass("choice" +num);

            $('#buttons' + num).append(button);

        }

    }
}


game.drawButtons();

$(document).on("click", ".choice1", function () {
   console.log($(this).text());
    database.ref('player1').update({ choice: $(this).text() });


});

$(document).on("click", ".choice2", function () {
    console.log($(this).text());
     database.ref('player2').update({ choice: $(this).text() });
 });

 


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



};