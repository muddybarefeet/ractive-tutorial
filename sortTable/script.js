(function () {

  var xmen = [
    { name: 'Nightcrawler', realname: 'Wagner, Kurt',     power: 'Teleportation',    info: 'http://www.superherodb.com/Nightcrawler/10-107/' },
    { name: 'Cyclops',      realname: 'Summers, Scott',   power: 'Optic blast',      info: 'http://www.superherodb.com/Cyclops/10-50/' },
    { name: 'Rogue',        realname: 'Marie, Anna',      power: 'Absorbing powers', info: 'http://www.superherodb.com/Rogue/10-831/' },
    { name: 'Wolverine',    realname: 'Howlett, James',   power: 'Regeneration',     info: 'http://www.superherodb.com/Wolverine/10-161/' }
  ];

  var ractive = new Ractive({
    el: "#container",
    template: "#template",
    data: {
      title: "Sort table",
      superheroes: xmen,
      sortCol: "name",
      sort: function (arr, col) {
        var newArr = arr.slice();
        return newArr.sort(function (a,b) {
          return a[ col ] < b[ col ] ? -1 : 1;
        });
      }
    }
  });

  // ractive.set('superheroes[0].name', "Huggada");
  // ractive.set('superheroes[0]', {name: 'Huggada', realname: 'Rogers, Anna',     power: 'Hugs',    info: 'http://www.muddybarefeet.com'});
  ractive.push('superheroes',{name: 'Huggada', realname: 'Rogers, Anna',     power: 'Hugs',    info: 'http://www.muddybarefeet.com'});

  ractive.on('sort', function (event, col) {
    this.set('sortCol',col);
  });

})();