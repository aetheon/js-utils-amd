
/*
 * Editable Text UI Control
 *
 * Provides editable text on HTML elements, providing a toolbar with some operations
 *
 * forked from https://github.com/balupton/html5edit
 * Oscar Brito
 *
 *
 *
 *
 */

define([
    "require",
    "jquery",
    "lodash",
    "js-utils/Dom/RichTextFormatter",
    "js-utils-lib/Safe",
    "js-utils-lib/Type"
    ],
    function(require, $, _){


        var Safe = require("js-utils-lib/Safe"),
            Type = require("js-utils-lib/Type"),
            RichTextFormatter = require("js-utils/Dom/RichTextFormatter");

        // static variables
        var EditableClass = "js-utils-ui-editable",
            ToolbarClass = "js-utils-ui-editable-toolbar";


        /*
         * Add a change event on contenteditable elements
         * From http://stackoverflow.com/a/6263537/270433
         */
        $('body').on('focus', EditableClass, function() {
            var $this = $(this);
            $this.data('before', $this.html());
            return $this;
        }).on('blur keyup paste', EditableClass, function() {
            var $this = $(this);
            if ($this.data('before') !== $this.html()) {
                $this.data('before', $this.html());
                $this.trigger('change');
            }
            return $this;
        });


        /*
         * Editable control for HTMLElements (contentEditable="true")
         * 
         *
         *
         */
        var Editable = function(element, options){


            // Create some defaults, extending them with any options that were provided
            var settings = $.extend({
                'toolbar-items': [
                    [
                        ['h1', 'H1', 'Heading 1'],
                        ['h2', 'H2', 'Heading 2'],
                        ['h3', 'H3', 'Heading 3'],
                        ['h4', 'H4', 'Heading 4'],
                        ['h5', 'H5', 'Heading 5'],
                        ['p', '¶', 'Paragraph'],
                        ['blockquote', '❝', 'Blockquote'],
                        ['code', 'Code', 'Code']
                    ],
                    [
                        ['ul', '• list', 'Unordered list'],
                        ['ol', '1. list', 'Ordered list']
                    ],
                    [
                        ['link', 'Link', 'Insert Link'],
                        ['image', 'Image', 'Insert Image'],
                        ['video', 'Video', 'Insert Video']
                    ],
                    [
                        ['bold', 'B', 'Bold'],
                        ['italic', 'I', 'Italicize'],
                        ['underline', 'U', 'Underline'],
                        ['strike', 'Abc', 'Strikethrough'],
                        ['sup', 'X<sup>2</sup>', 'Superscript'],
                        ['sub', 'X<sub>2</sub>', 'Subscript'],
                        ['remove', '⌫', 'Remove Formating']
                    ]
                ],

                'toolbarCssClass': "jquery-editableText-toolbar",
                'toolbarContainer': "body",

                'left-toolbar': false,
                'auto-hide-toolbar': false
            }, options);




            var $this = $(element),
                $contenteditable = $this,
                $editorContainer = $this,
                $toolbar = null,
                $formater = new RichTextFormatter();



            // initialize toolbar
            var initializeToolbar = function(){


                // initializes toolbar
                var $toolbar = $('<div></div>')
                                .addClass(ToolbarClass)
                                .addClass(settings.toolbarCssClass)
                                .css("display", "none")
                                .prependTo($(settings.toolbarContainer));


                // initializes toolbar items
                $.each(settings['toolbar-items'], function(index1, items) {

                    var $toolbarItems = $('<div class="btn-group" role="toolbar"></div>')
                        .appendTo($toolbar);

                    var control = null;

                    $.each(items, function(index2, item) {

                        var type = Type.of(item[1]);
                        switch(type){

                            case "array":
                                control = $('<select class="btn btn-default"></select>');
                                control.append("<option>"+item[2]+"</option>");
                                _.each(item[1], function(option){
                                    control.append("<option value='" + option[0] + "'>" + option[1] + "</option>");
                                });
                                break;


                            default:
                                control = $('<button type="button" class="btn btn-default" data-rule=' + item[0] +'>'+item[1]+'</button>');
                                break;

                        }

                        control.appendTo($toolbarItems);

                    });

                });


                // when a button is clicked
                $toolbar.on("click", 'button.btn', function () {
                    
                    // save the clicked status of the toolbar               
                    $toolbar.data('clicked', true);

                    // the rule to apply
                    var rule = $(this).data("rule");

                    // apply the format
                    $formater.format(this, rule);

                    // trigger the change on editable
                    $contenteditable.trigger('change');

                });

                // on select click
                $toolbar.on("click", 'select.btn', function () {
                    $toolbar.data('ignorehide', true);
                });

                // when select is clicked
                $toolbar.on("change", 'select.btn', function () {
                    // save the clicked status of the toolbar               
                    $toolbar.data('clicked', true);
                    

                    // get the option value
                    var value = $(":selected", this).val();
                    
                    // set the value 
                    $formater.format(this, "html", value);

                    // trigger the change on editable
                    $contenteditable.trigger('change');

                });




                // initialize data
                $toolbar.data('auto-hide-toolbar', settings['auto-hide-toolbar']);
                $toolbar.data('clicked', false);


                // OPTIONS: auto-hide-toolbar
                $toolbar.hide();

                $contenteditable.focus(function () {
                    // hide all same toolbars
                    $("." + settings.toolbarCssClass, $(settings.toolbarContainer)).hide();
                    // show toolbar on focus
                    $toolbar.show();
                });
                

                return $toolbar;
                
            };

            // initialize editable
            var initializeEditable = function(){

                // when change its value
                $contenteditable.change(function() {
                    var value = $(this).html();
                    $this.val(value);
                });

                // lost focus workaround
                $contenteditable.blur(function() {                   

                    /*
                     * if ather 250ms the toolbar was not clicked, hide it
                     * TODO: find a better way do to this, didn't hide toolbar when editor lose focus for the toolbar 
                     */
                     Safe.debouncedCall(
                        function() {

                            if($toolbar.data('ignorehide')){
                                $toolbar.data('ignorehide', false);
                                return;
                            }
                            
                            if (! $toolbar.data('clicked')) $toolbar.fadeOut();
                            $toolbar.data('clicked', false);

                        }, { delay: 300 });                     

                });

                // gain focus
                $($contenteditable).on('focus', function() {
                    var $this = $(this);
                    $this.data('before', $this.html());
                    return $this;
                });


                // when blur
                $($contenteditable).on('blur keyup paste', function() {
                    var $this = $(this);
                    if ($this.data('before') !== $this.html()) {
                        $this.data('before', $this.html());
                        $this.trigger('change');
                    }
                    return $this;
                });

                $contenteditable
                    .addClass(EditableClass)
                    .attr("contenteditable", "true");

            };


            $toolbar = initializeToolbar();
            initializeEditable();
           
         };



         return Editable;

});

