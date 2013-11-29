
define(["require", "js-utils/JQueryMobile/PageTracker", "js-utils/UI/Overlay"], function(require){
    "use strict";

    var PageTracker = require("js-utils/JQueryMobile/PageTracker"),
        Overlay = require("js-utils/UI/Overlay");

    var tracker = new PageTracker(),
        overlay = new Overlay();

    tracker.on("changing", function(){
        overlay.show();
    });

    tracker.on("change", function(){
        overlay.hide();
    });

});