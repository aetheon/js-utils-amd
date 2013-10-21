
/*
 * $.editableText() - JQuery Plugin
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
    "jquery",
    "js-utils/JQueryPlugins/doTimeout"
    ],
    function($){


        /*
         * Add a change event on contenteditable elements
         * From http://stackoverflow.com/a/6263537/270433
         */
         $('body').on('focus', '.html5-editor', function() {
            var $this = $(this);
            $this.data('before', $this.html());
            return $this;
        }).on('blur keyup paste', '.html5-editor', function() {
            var $this = $(this);
            if ($this.data('before') !== $this.html()) {
                $this.data('before', $this.html());
                $this.trigger('change');
            }
            return $this;
        });


        /*
         * From http://stackoverflow.com/a/7356528/270433
         */
         function isFunction(functionToCheck) {
             var getType = {};
             return functionToCheck && getType.toString.call(functionToCheck) == '[object Function]';
         }


         var methods = {



            init: function(options) {

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


                return this.each(function() {

                    var $this = $(this);
                    var $editorContainer = $(this).attr("contenteditable", "true"); //$('<div class="html5-editor-container"></div>').insertAfter($this);

                    var $toolbar = $('<div></div>')
                                    .addClass(settings.toolbarCssClass)
                                    .prependTo($(settings.toolbarContainer));


                    $.each(settings['toolbar-items'], function(index1, items) {

                        var $toolbarItems = $('<ul class="btn-group"></ul>').appendTo($toolbar);
                        $.each(items, function(index2, item) {
                            $('<li><a href="#" class="btn btn-default"'+item[0]+'" title="'+(item[2] || item[1])+'">'+item[1]+'</a></li>')
                            .click(function() {
                                switch(item[0]) {
                                    case 'p':
                                        methods.formatBlock.apply(this, ["<p>"]);
                                        break;
                                    case 'h1':
                                        methods.formatBlock.apply(this, ["<h1>"]);
                                        break;
                                    case 'h2':
                                        methods.formatBlock.apply(this, ["<h2>"]);
                                        break;
                                    case 'h3':
                                        methods.formatBlock.apply(this, ["<h3>"]);
                                        break;
                                    case 'h4':
                                        methods.formatBlock.apply(this, ["<h4>"]);
                                        break;
                                    case 'h5':
                                        methods.formatBlock.apply(this, ["<h5>"]);
                                        break;
                                    case 'blockquote':
                                        methods.formatBlock.apply(this, ["<blockquote>"]);
                                        break;
                                    case 'code':
                                        methods.formatBlock.apply(this, ["<pre>"]);
                                        break;
                                    case 'ul':
                                        methods.unorderedList.apply(this);
                                        break;
                                    case 'ol':
                                        methods.orderedList.apply(this);
                                        break;
                                    case 'sup':
                                        methods.superscript.apply(this);
                                        break;
                                    case 'sub':
                                        methods.subscript.apply(this);
                                        break;
                                    case 'bold':
                                        methods.bold.apply(this);
                                        break;
                                    case 'italic':
                                        methods.italic.apply(this);
                                        break;
                                    case 'underline':
                                        methods.underline.apply(this);
                                        break;
                                    case 'strike':
                                        methods.strike.apply(this);
                                        break;
                                    case 'remove':
                                        methods.removeFormat.apply(this);
                                        break;
                                    case 'link':
                                        methods.createLink.apply(this);
                                        break;
                                    case 'image':
                                        methods.insertImage.apply(this);
                                        break;
                                    case 'video':
                                        methods.insertVideo.apply(this);
                                        break;
                                    case 'custom':
                                        // call custom function
                                        if (isFunction(item[3])) item[3]();
                                        break;
                                }
                                
                                // trigger editor change event
                                $contenteditable.trigger('change');
                                return false;


                            }).appendTo($toolbarItems);

                        });
                    });



                    var $contenteditable = $editorContainer; //$('<div class="html5-editor" contenteditable="true"></div>').appendTo($editorContainer);

                    $toolbar.data('auto-hide-toolbar', settings['auto-hide-toolbar']);
                    $toolbar.data('clicked', false);

                    if (settings['auto-hide-toolbar']) {
                        $toolbar.hide();

                        $contenteditable.focus(function () {
                            // hide all same toolbars
                            $("." + settings.toolbarCssClass, $(settings.toolbarContainer)).hide();
                            // show toolbar on focus
                            $toolbar.show();
                        });
                    }


                    $contenteditable.change(function() {
                        $this.val($(this).html());
                    });

                    $contenteditable.blur(function() {

                        if (settings['auto-hide-toolbar']) {
                            /*
                             * if ather 250ms the toolbar was not clicked, hide it
                             * TODO: find a better way do to this, didn't hide toolbar when editor lose focus for the toolbar 
                             */
                             $.doTimeout(250, function() {
                                if (! $toolbar.data('clicked')) $toolbar.fadeOut();
                                $toolbar.data('clicked', false);
                            });
                         }


                    });


                    // fire chhange event on element
                    $($contenteditable).on('focus', function() {
                        var $this = $(this);
                        $this.data('before', $this.html());
                        return $this;
                    }).on('blur keyup paste', function() {
                        var $this = $(this);
                        if ($this.data('before') !== $this.html()) {
                            $this.data('before', $this.html());
                            $this.trigger('change');
                        }
                        return $this;
                    });

                    $toolbar.find('ul li a').click(function () {
                        // save the clicked status of the toolbar               
                        $toolbar.data('clicked', true);
                    });

                    //$contenteditable.html($this.val());
                    //$this.hide();

                    if(settings['left-toolbar']) {
                        $toolbar.addClass('left');
                        $contenteditable.addClass('left-toolbar');
                    }

                });


            },

            bold: function() {
                document.execCommand("bold", false, null);
            },
            italic: function() {
                document.execCommand("italic", false, null);
            },
            underline: function() {
                document.execCommand("underline", false, null);
            },
            strike: function() {
                document.execCommand("StrikeThrough", false, null);
            },
            orderedList: function() {
                document.execCommand("InsertOrderedList", false, null);
            },
            unorderedList: function() {
                document.execCommand("InsertUnorderedList", false, null);
            },
            indent: function() {
                document.execCommand("indent", false, null);
            },
            outdent: function() {
                document.execCommand("outdent", false, null);
            },
            superscript: function() {
                document.execCommand("superscript", false, null);
            },
            subscript: function() {
                document.execCommand("subscript", false, null);
            },
            createLink: function() {
                var urlPrompt = prompt("Enter the link URL:", "http://");
                document.execCommand("createLink", false, urlPrompt);
            },
            insertImage: function() {
                var urlPrompt = prompt("Enter the image URL:", "http://");
                document.execCommand("InsertImage", false, urlPrompt);
            },
            insertVideo: function() {
                var videoEmbedCode = prompt("Enter the video embed code:", "");
                console.log(videoEmbedCode);
                document.execCommand('insertHTML', false, videoEmbedCode);
            },
            formatBlock: function(block) {
                document.execCommand("FormatBlock", null, block);
            },
            removeFormat: function() {
                document.execCommand("removeFormat", false, null);
            }

        };


    $.fn.editableText = function( method ) {
        // Method calling logic
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
        }
    };


});
