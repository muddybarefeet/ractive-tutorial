(function () {

  var item = "<li class='{{ done ? \"done\" : \"pending\" }}'>" +
               "<input type='checkbox' checked='{{done}}'>" +
               "<span class='description' on-click='edit'>" +
                 "{{description}}" +

                 "{{#if editing}}" +
                   "<input " +
                          "value='{{description}}' " +
                          "on-blur='stop_editing'>" +
                 "{{/if}}" +
               "</span>" +
               "<button><a class='button' on-tap='remove'>x</a></button>" +
             "</li>";

  var TodoList = Ractive.extend({
    //give the initial object the template using
    template: '#template',
    //partial here 
    partials: { item: item },

    addItem: function ( description ) {
      //access the data object on the Ractive component with this
      this.push( 'items', {
        description: description,
        done: false
      });
    },

    removeItem: function ( index ) {
      this.splice( 'items', index, 1 );
    },

    editItem: function ( index ) {
      var self = this, keydownHandler, blurHandler, input, currentDescription;

      currentDescription = this.get( 'items.' + index + '.description' );
      this.set( 'items.' + index + '.editing', true );

      input = this.find( '.edit' );
      input.select();

      window.addEventListener( 'keydown', keydownHandler = function ( event ) {
        switch ( event.which ) {
          case 13: // ENTER
          input.blur();
          break;

          case 27: // ESCAPE
          input.value = currentDescription;
          self.set( 'items.' + index + '.description', currentDescription );
          input.blur();
          break;

          case 9: // TAB
          event.preventDefault();
          input.blur();
          self.editItem( ( index + 1 ) % self.get( 'items' ).length );
          break;
        }
      });

      input.addEventListener( 'blur', blurHandler = function () {
        window.removeEventListener( 'keydown', keydownHandler );
        input.removeEventListener( 'blur', blurHandler );
      });

      this.set( 'items.' + index + '.editing', true );
    },

    //on init the page we add event handlers
    oninit: function ( options ) {
      // proxy event handlers
      this.on({
        remove: function ( event ) {
          this.removeItem( event.index.i );
        },

        //when a new todo is added then trigger the addItem function and then clear the input box
        //see html to show that this is called on change in the input
        newTodo: function ( event ) {
          this.addItem( event.node.value );
          event.node.value = '';
        },

        edit: function ( event ) {
          this.editItem( event.index.i );
        },

        stop_editing: function ( event ) {
          this.set( event.keypath + '.editing', false );
        }

      });
    },

    // sadly this is necessary for IE - other browsers fire the change event
    // when you hit enter
    events: {
      enter: function ( node, fire ) {
        var keydownHandler = function ( event ) {
          var which = event.which || event.keyCode;
          which === 13 && fire({ node: node, original: event });
        };

        node.addEventListener( 'keydown', keydownHandler );

        return {
          teardown: function () {
            node.removeEventListener( 'keydown', keydownHandler );
          }
        };
      }
    }
  });

  var ractive = new TodoList({
    //tell this what component using to put the template on the screen in
    el: '#container',
    data: {
      items: [
        { done: false,  description: 'Add a todo item'},
        { done: false, description: 'Add some more todo items' },
        { done: false, description: 'Complete all the Ractive tutorials' }
      ]
    }
  });


})();