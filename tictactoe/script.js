(function () {

  var ractive = new Ractive({
    el: "#container",
    template: "#template",
    data: {
      nextToPlay: "O",
      board: [
        {cell1:"", cell2:"", cell3:""},
        {cell1:"", cell2:"", cell3:""},
        {cell1:"", cell2:"", cell3:""},
      ],
      checkRows: function (board) {
        for (var i=0; i<board.length; i++) {
          if (board[i].cell1 === board[i].cell2 && board[i].cell2 === board[i].cell3 && board[i].cell1 !== "") {
            return board[i][0] === 1 ? 1 : 2;
          }
        }
        return -1;
      },
      checkCols: function (board) {
        var options = ["cell1","cell2","cell3"];
        for (var i=0; i<options.length; i++) {
          if (board[0][options[i]] === board[1][options[i]] && board[1][options[i]] === board[2][options[i]] && board[0][options[i]] !== "") {
            return board[0][i] === 1 ? 1 : 2;
          }
        }
        return -1;
      },
      isSolved: function (board) {
        var rowCheckFn = ractive.get('checkRows');
        var colCheckFn = ractive.get('checkCols');
        var diagCheckFn = ractive.get('checkDiags');
         if (rowCheckFn(board) > 0) {
           return rowCheckFn(board) === 1 ? 1 : 2;
         }
         if (colCheckFn(board) > 0) {
           return colCheckFn(board) === 1 ? 1 : 2;
         }
         return -1;
      }
    }
    
  });

  ractive.on('select', function (index, whichCell) {
    
    //set the current square selected to O or X
    var currentSelection = ractive.get('board['+index+']');
    if (currentSelection[whichCell] === "") currentSelection[whichCell] = ractive.get('nextToPlay');

    //now check the board to see if anyone has won
    var isSolvedFn = ractive.get('isSolved');

    var checkWin = isSolvedFn(ractive.get('board'));
    if (checkWin > 0) {
      if (checkWin === 2) {
        //naughts won
        ractive.set('winner', "0");
      } else {
        //crosses won
        ractive.set('winner', "X");
      }
    }

    // update the next peice to be played
    if (ractive.get('nextToPlay') === "O") {
      ractive.set('nextToPlay', "X");
    } else {
      ractive.set('nextToPlay', "O");
    }
    ractive.update('board');

  });


})();