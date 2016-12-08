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
      ]
    }
    
  });

  ractive.on('select', function (index, whichCell) {
    //place the current piece and stop this square from being clicked again
    var currentSelection = ractive.get('board['+index+']');
    currentSelection[whichCell] = ractive.get('nextToPlay');
    if (ractive.get('nextToPlay') === "O") {
      ractive.set('nextToPlay', "X");
    } else {
      ractive.set('nextToPlay', "O");
    }
    ractive.update('board');

  });


})();