// wait for the DOM to finish loading
$(document).ready(function() {
  var $squares = $('.box');

  var turn = "X";

  function resetGame() {
    $squares.text("");
    $squares.removeClass("X");
    $squares.removeClass("O");

    turn = "X";
  };

  function changeTurn() {
    if (turn === "X") {
      turn = "O";
    } else {
      turn = "X";
    }
  };

  /**** HELPER FUNCTIONS TO CHECK FOR WINNER ****/

  // returns "X" if player X owns all three boxes passed in,
  //   "O" if player O owns all three boxes passed in, or
  //   null otherwise
  function allThree($firstBox, $secondBox, $thirdBox) {
   var firstBoxOwner = $firstBox.text(),
        secondBoxOwner = $secondBox.text(),
        thirdBoxOwner = $thirdBox.text();

    if ((firstBoxOwner === secondBoxOwner) && (secondBoxOwner === thirdBoxOwner)){
      if (firstBoxOwner === "X"){
        return "X";
      } else if (firstBoxOwner === "O"){
        return "O";
      }
    }
    // we will only get to this point if we haven't returned
    // a player mark yet
    return null;
  };

  // check for wins across both diagonals
  // returns a player mark if one player owns all three boxes in one of the diagonals
  // returns null otherwise
  function diagonalWinner() {
    // the eq method is how we "index into" a jQuery collection!
    var leftDownDiag = allThree($squares.eq(0), $squares.eq(4), $squares.eq(8));
    var rightUpDiag = allThree($squares.eq(2), $squares.eq(4), $squares.eq(6));

    // Using a special property of JS's OR (||) to return the winning mark
    // remember, as soon as JS finds a truthy side of an OR,
    // it returns the *value* of that side.  So null || "O" will give us "O".
    return leftDownDiag || rightUpDiag;
  };

  // check for wins on columns
  // returns a player mark if one player owns all three boxes in one of the columns
  // returns null otherwise
  function columnWinner() {
    var leftCol = allThree($squares.eq(0), $squares.eq(3), $squares.eq(6));
    var middleCol = allThree($squares.eq(1), $squares.eq(4), $squares.eq(7));
    var rightCol = allThree($squares.eq(2), $squares.eq(5), $squares.eq(8));

    // using the || trick again
    return leftCol || (middleCol || rightCol);
  };

  // check for wins on rows
  // returns a player mark if one player owns all three boxes in one of the row
  // returns null otherwise
  function rowWinner() {
    var topRow = allThree($squares.eq(0), $squares.eq(1), $squares.eq(2));
    var middleRow = allThree($squares.eq(3), $squares.eq(4), $squares.eq(5));
    var bottomRow = allThree($squares.eq(6), $squares.eq(7), $squares.eq(8));

    return topRow || (middleRow || bottomRow);
  };

  function getWinner() {
    return diagonalWinner() || (rowWinner() || columnWinner());
  };

  function boardHasEmptyBoxes() {
    var hasEmptyBoxes = false;
    for (var i=0; i<$squares.length; i++){
      if ($squares.eq(i).text() === ''){
        hasEmptyBoxes = true;
      }
    }
    return hasEmptyBoxes;
  }




  $('#reset').on('click', function() {
    resetGame();
  });

  $squares.on('click', function() {
    if ($(this).text() === "") {

      $(this).text(turn);
      $(this).addClass(turn);


      var winner = getWinner();
      if (winner) {
        alert("Player " + winner + " won!");
        resetGame();
      } else if (boardHasEmptyBoxes()) {
        changeTurn();
      } else {
        alert("Tie");
        resetGame();
      }
    }
  });


});
