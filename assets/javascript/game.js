//firebase config
var config = {
    apiKey: "AIzaSyCXrEsIs6vHJtgInlRC-nV_k9VOEgftcog",
    authDomain: "rpsm-cc460.firebaseapp.com",
    databaseURL: "https://rpsm-cc460.firebaseio.com",
    projectId: "rpsm-cc460",
    storageBucket: "rpsm-cc460.appspot.com",
    messagingSenderId: "325224256219"
};

//initialize and get database variable
firebase.initializeApp(config);
var database = firebase.database();

//global player number variable
var playernum;

//make database updates on pageload
database.ref().once("value", function (snap) {

    //assign player numbers, make sure there are no more than two players
    if (!snap.child("player1").exists()) {
        playernum = 1;
        database.ref('player1').update({
            'player1': playernum,
            name: 'Waiting for Player 1...',
            choice: 1,
            wins: 0,
            losses: 0,
            ties: 0
        });
        $('#buttons2').hide();
    }
    else if (snap.child("player1").exists() && !snap.child("player2").exists()) {
        playernum = 2;
        database.ref('player2').update({
            'player2': playernum,
            name: 'Waiting for Player 2...',
            choice: 1,
            wins: 0,
            losses: 0,
            ties: 0
        });
        $('#buttons1').hide();
    }
    else if (snap.child("player1").exists() && snap.child("player2").exists()) {
        document.write('<h1> There are already two players</h1>');
    }

    //get rid of current player and all player choices on disconnect
    database.ref('player' + playernum).onDisconnect().remove();
    database.ref('playerChoice').onDisconnect().remove();

    //draw buttons for both players, will be hidden appropriately later
    game.drawButtons(playernum);

});

//get player name and update database
$("#submit-name").on("click", function (event) {
    event.preventDefault();
    playername = $('#name').val();
    database.ref('player' + playernum).update({ name: playername });
    $('#name-form').hide();


});

//variables for player stats
var player1Wins = 0;
var player1Losses = 0;
var player1Ties = 0;
var player2Wins = 0;
var player2Losses = 0;
var player2Ties = 0;

//on overall database value change,
database.ref().on("value", function (snap) {

    //display the player name
    $('#player-1-name').html(snap.child('player1').child('name').val());
    $('#player-2-name').html(snap.child('player2').child('name').val());

    console.log(snap.child('player1').child('choice').val());
});

//Run logic on a player choice
database.ref('playerChoice').on("value", function (snap) {

    //get choices from database
    var player1Guess = snap.child('player1choice').val();
    var player2Guess = snap.child('player2choice').val();

    //RPS logic
    if (player1Guess == 'Rock' && player2Guess == 'Paper') {
        player1Lose();
    }
    else if (player1Guess == 'Rock' && player2Guess == 'Scissors') {
        player1Win();

    }
    else if (player1Guess == 'Paper' && player2Guess == 'Scissors') {
        player1Lose();
    }
    else if (player1Guess == 'Paper' && player2Guess == 'Rock') {
        player1Win();

    }
    else if (player1Guess == 'Scissors' && player2Guess == 'Rock') {
        player1Lose();
    }
    else if (player1Guess == 'Scissors' && player2Guess == 'Paper') {
        player1Win();
    }
    else if (player1Guess == player2Guess && player1Guess != null) {
        playersTie();
    }
});

//RPS logic functions
function player1Lose() {
    player1Losses++;
    player2Wins++;
    database.ref('player1').update({ losses: player1Losses });
    $('#player-1-losses').html(player1Losses);
    database.ref('player2').update({ wins: player2Wins });
    $('#player-2-wins').html(player2Wins);
    database.ref('playerChoice').remove();

}
function player1Win() {
    player2Losses++;
    player1Wins++;
    database.ref('player2').update({ losses: player2Losses });
    $('#player-2-losses').html(player2Losses);
    database.ref('player1').update({ wins: player1Wins });
    $('#player-1-wins').html(player1Wins);
    database.ref('playerChoice').remove();
}
function playersTie() {
    player1Ties++;
    player2Ties++;
    database.ref('player2').update({ ties: player2Ties });
    $('#player-2-ties').html(player2Ties);
    database.ref('player1').update({ ties: player1Ties });
    $('#player-1-ties').html(player1Ties);
    database.ref('playerChoice').remove();
}


//underutilized game object -- perhaps expand later
var game = {

    options: ["Rock", "Paper", "Scissors"],
    wins: 0,
    losses: 0,
    ties: 0,

    drawButtons: function (num) {
        for (var i = 0; i < this.options.length; i++) {
            var button = $('<button>' + this.options[i] + '</button>').addClass("choice" + num);

            $('#buttons' + num).append(button);

        }

    }
}

//get Player 1 choice
$(document).on("click", ".choice1", function () {
    console.log($(this).text());
    database.ref('playerChoice').update({ player1choice: $(this).text() });


});

//get Player 2 choice
$(document).on("click", ".choice2", function () {
    console.log($(this).text());
    database.ref('playerChoice').update({ player2choice: $(this).text() });
});