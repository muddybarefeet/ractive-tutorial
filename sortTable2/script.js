(function () {

  var ractive = new Ractive({
    el: "#container",
    template: "#template",
    data: {
      sortColumn: "name",
      sortDirection: "asc",
      previousSorts: {
        name: "asc",
        realname: null,
        power: null
      },
      starWars: [
        { name: 'Princess Lea', realname: 'Carrie Fisher', power: 'Ninja'},
        { name: 'Han Solo',      realname: 'Harrison Ford', power: 'Fighter'},
        { name: 'Luke Skywalker',        realname: 'Mark Hamill', power: 'Jedi'},
        { name: 'R2-D2',    realname: 'Robot',   power: 'Cute'}
      ],
      sortData: function ( array, sortColumn, sortDirection ) {
        array = array.slice(); // clone, so we don't modify the underlying data
        return array.sort( function ( a, b ) {
          if (sortDirection === "asc") {
            return a[ sortColumn ] < b[ sortColumn ] ? -1 : 1;
          } else {
            return a[ sortColumn ] > b[ sortColumn ] ? -1 : 1;
          }
        });
      }
    }
  });

  ractive.on('sort', function (event, column) {

    //if the same col as previously clicked
    if (column === ractive.get('sortColumn')) {
      var currentDir = ractive.get('sortDirection');
      if (currentDir === "asc") {
        ractive.set('sortDirection', "desc");
      } else {
        ractive.set('sortDirection', "asc");
      }
    } else {
      //get val from prev sorts if not null then use to set the current sort
      var prevSortsForCol = ractive.get('previousSorts.'+ column);
      console.log('previous for this col: ',prevSortsForCol);
      if (prevSortsForCol === null || prevSortsForCol === "desc") {
        ractive.set('previousSorts.'+ column, "asc");
        ractive.set('sortDirection', "asc");
      } else {
        if (prevSortsForCol === "asc") {
          ractive.set('previousSorts.'+ column, "desc");
          ractive.set('sortDirection', "desc");
        }
      }
    }
    console.log('sort new', ractive.get('previousSorts'));
    ractive.set('sortColumn', column);

  });


})();