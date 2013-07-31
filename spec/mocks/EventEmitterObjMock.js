define(["EventEmitter", "src/OOP/index"], function(EventEmitter, OOP){

    /*
     * returns a hash with the obj function and its
     * related event.
     * Very useful to mock event class's
     */

    var event = new EventEmitter();

    return {
        obj: function(){ return event; },
        event: event
    };

});