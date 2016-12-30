(function () {

  var colors = [ 'red', 'green', 'blue' ];
  var ractive = new Ractive({
    el: "#container",
    template: "#template",
    data: {
      colors: colors,
      color: colors[0]
    }
  });


})();