(function () {

  var ractive = new Ractive({
    el: "#container",
    template: "#template",
    data: {
      card: {
        back: "http://vignette3.wikia.nocookie.net/youtubepoop/images/4/4c/Pokeball.png/revision/latest",
        width: "100"
      },
      clickedKeypath: null,
      pairsFlipped: 0,
      busy: false,
      win: false,
      board: [
              {image:"http://cdn.bulbagarden.net/upload/thumb/7/73/004Charmander.png/600px-004Charmander.png", clicked: false},
              {image:"http://cdn.bulbagarden.net/upload/2/21/001Bulbasaur.png", clicked: false},
              {image:"http://cdn.bulbagarden.net/upload/thumb/7/73/004Charmander.png/600px-004Charmander.png", clicked: false},
              {image:"http://cdn.bulbagarden.net/upload/4/41/130Gyarados.png", clicked: false},
              {image:"http://cdn.bulbagarden.net/upload/thumb/3/3e/039Jigglypuff.png/250px-039Jigglypuff.png", clicked: false},
              {image:"http://cdn.bulbagarden.net/upload/thumb/3/3e/039Jigglypuff.png/250px-039Jigglypuff.png", clicked: false},
              {image:"http://cdn.bulbagarden.net/upload/2/21/001Bulbasaur.png", clicked: false},
              {image:"http://cdn.bulbagarden.net/upload/4/41/130Gyarados.png", clicked: false}
            ]
    }

  });

  ractive.on('handleShow', function (e) {
    //update the clicked property on the image clicked
    if (ractive.get('busy')) {
      return;
    }

    var board2 = ractive.get(e.keypath);
    board2.clicked = true;
    ractive.update('board');

    if (ractive.get('clickedKeypath') === null) {
      ractive.set('clickedKeypath', e.keypath);
    } else {
      //if one already overturned then see if this one matches else flip back over and reset the two indexes using
      var previousBoardIndex = ractive.get('clickedKeypath');
      if (ractive.get(e.keypath).image === ractive.get(previousBoardIndex).image) {
        ractive.set('clickedKeypath', null);
        //increment pairs flipped and alert if finished
        ractive.set('pairsFlipped', ractive.get('pairsFlipped') + 1);
        if (ractive.get('pairsFlipped') === 4) {
          ractive.set('win', true);
        }
      } else {
        ractive.set('busy', true);
        setTimeout(function () {
          var one = ractive.get(e.keypath);
          one.clicked = false;
          var two = ractive.get(previousBoardIndex);
          two.clicked = false;
          ractive.set('clickedKeypath', null);
          ractive.set('busy', false);
          ractive.update();
        },2000);
      }
    }

  });

  ractive.on('startAgain', function () {
    //set the state back to its inital state
    ractive.reset({
      card: {
        back: "http://vignette3.wikia.nocookie.net/youtubepoop/images/4/4c/Pokeball.png/revision/latest",
        width: "100"
      },
      clickedKeypath: null,
      pairsFlipped: 0,
      busy: false,
      win: false,
      board: [
              {image:"http://cdn.bulbagarden.net/upload/thumb/7/73/004Charmander.png/600px-004Charmander.png", clicked: false},
              {image:"http://cdn.bulbagarden.net/upload/2/21/001Bulbasaur.png", clicked: false},
              {image:"http://cdn.bulbagarden.net/upload/thumb/7/73/004Charmander.png/600px-004Charmander.png", clicked: false},
              {image:"http://cdn.bulbagarden.net/upload/4/41/130Gyarados.png", clicked: false},
              {image:"http://cdn.bulbagarden.net/upload/thumb/3/3e/039Jigglypuff.png/250px-039Jigglypuff.png", clicked: false},
              {image:"http://cdn.bulbagarden.net/upload/thumb/3/3e/039Jigglypuff.png/250px-039Jigglypuff.png", clicked: false},
              {image:"http://cdn.bulbagarden.net/upload/2/21/001Bulbasaur.png", clicked: false},
              {image:"http://cdn.bulbagarden.net/upload/4/41/130Gyarados.png", clicked: false}
            ]
    });
  });

})();