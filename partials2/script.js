(function () {

  var item = "";

  var Test = Ractive.extend({
    //give the initial object the template using
    template: '#template',
    partials: {  },

    // methods
    showItem: function () {
      this.set('show', true);
    },

    //on init the page we add event handlers
    oninit: function ( options ) {
      // proxy event handlers
      this.on({
        effect: function (event) {
          this.showItem();
        }
      });
    },

    // sadly this is necessary for IE - other browsers fire the change event
    // when you hit enter
    events: {
      // enter: function ( node, fire ) {
      //   var keydownHandler = function ( event ) {
      //     var which = event.which || event.keyCode;
      //     which === 13 && fire({ node: node, original: event });
      //   };

      //   node.addEventListener( 'keydown', keydownHandler );

      //   return {
      //     teardown: function () {
      //       node.removeEventListener( 'keydown', keydownHandler );
      //     }
      //   };
      // }
    }
  });

  var ractive = new Test({
    //tell this what component using to put the template on the screen in
    el: '#container',
    data: {
      show:false
    }
  });


})();