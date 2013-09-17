
define(["require", "js-utils/JQueryMobile/PageTracker", "js-utils/UI/ElementOverlay"], function(require){
    "use strict";

    var PageTracker = require("js-utils/JQueryMobile/PageTracker"),
        ElementOverlay = require("js-utils/UI/ElementOverlay");

    var tracker = new PageTracker(),
        overlay = new ElementOverlay();

    tracker.on("changing", function(){
        overlay.show();
    });

    tracker.on("change", function(){
        overlay.hide();
    });

});