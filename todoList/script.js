(function () {

  var ractive = new Ractive({
    el: "#container",
    template: "#template",
    data: {
      items: [
        { done: false,  description: 'Add a todo item' },
        { done: false, description: 'Add some more todo items' },
        { done: false, description: 'Complete all the Ractive tutorials' }
      ]
    }
  });

  ractive.on('submit', function (event) {
    if (event.original.keyCode === 13) {
      ractive.push('items', { done: false, description: event.node.value });
      event.node.value = "";
      event.original.preventDefault();
    }
  });

})();