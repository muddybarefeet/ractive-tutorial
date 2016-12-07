(function () {

  var ractive = new Ractive({
    el: "#container",
    template: "#template",
    data: {
      card: {
        back: "http://vignette3.wikia.nocookie.net/youtubepoop/images/4/4c/Pokeball.png/revision/latest",
        width: "100"
      },
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
    console.log('clicked', e.keypath);
    var index = e.keypath;
    var board2 = ractive.get(index);
    board2.clicked = true;
    ractive.update('board');
  });


})();