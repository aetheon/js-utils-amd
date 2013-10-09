
require(["jquery", "js-utils/UI/StackedPanels"], function($, StackedPanels){

    var stack = new StackedPanels( $("body") );

    $(".btn.next").bind("click", function() { stack.next(); });
    $(".btn.prev").bind("click", function() { stack.prev(); });

});