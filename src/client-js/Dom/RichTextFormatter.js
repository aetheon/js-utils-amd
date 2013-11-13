
define([
    "require",
    "js-utils/Globals/Document"
    ],function(require){

        var document = require("js-utils/Globals/Document");

        /* 
         * Rich Text Formatter
         * https://developer.mozilla.org/en-US/docs/Rich-Text_Editing_in_Mozilla
         * 
         */
        var RichTextFormatter = function(){

            var methods = {

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
                insertHTML: function(html) {
                    document.execCommand('insertHTML', false, html);
                },
                formatBlock: function(block) {
                    document.execCommand("FormatBlock", null, block);
                },
                removeFormat: function() {
                    document.execCommand("removeFormat", false, null);
                }

            };


            return {


                "format": function(element, rule, extra){

                    switch(rule) {

                        case 'html':
                            methods.removeFormat.apply(element);
                            methods.insertHTML.apply(element, [extra]);
                            break;
                    
                        case 'p':
                            methods.formatBlock.apply(element, ["<p>"]);
                            break;
                        case 'h1':
                            methods.formatBlock.apply(element, ["<h1>"]);
                            break;
                        case 'h2':
                            methods.formatBlock.apply(element, ["<h2>"]);
                            break;
                        case 'h3':
                            methods.formatBlock.apply(element, ["<h3>"]);
                            break;
                        case 'h4':
                            methods.formatBlock.apply(element, ["<h4>"]);
                            break;
                        case 'h5':
                            methods.formatBlock.apply(element, ["<h5>"]);
                            break;
                        case 'blockquote':
                            methods.formatBlock.apply(element, ["<blockquote>"]);
                            break;
                        case 'code':
                            methods.formatBlock.apply(element, ["<pre>"]);
                            break;
                        case 'ul':
                            methods.unorderedList.apply(element);
                            break;
                        case 'ol':
                            methods.orderedList.apply(element);
                            break;
                        case 'sup':
                            methods.superscript.apply(element);
                            break;
                        case 'sub':
                            methods.subscript.apply(element);
                            break;
                        case 'bold':
                            methods.bold.apply(element);
                            break;
                        case 'italic':
                            methods.italic.apply(element);
                            break;
                        case 'underline':
                            methods.underline.apply(element);
                            break;
                        case 'strike':
                            methods.strike.apply(element);
                            break;
                        case 'remove':
                            methods.removeFormat.apply(element);
                            break;
                        case 'link':
                            methods.createLink.apply(element);
                            break;
                        case 'image':
                            methods.insertImage.apply(element);
                            break;
                        case 'video':
                            methods.insertVideo.apply(element);
                            break;
                    }
                }

            };

        };


        return RichTextFormatter;

    });