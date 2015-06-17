/**
 * Adds @listens tag to those DocBlocks that should have it
 *
 * The Ember.js on() {@link http://emberjs.com/api/classes/Ember.Evented.html#method_on} method subscribes to a named
 * event with given function. Without needing to populate @listens tags
 * {@link https://github.com/notmessenger/jsdoc-plugins#observestag} this plugin will automatically add them to the
 * DocBlocks for you during documentation generation.
 */
'use strict';

var whitelist = [
    'computed',
    'observer',
];

var addListensTagToComment = function( commentBlock, augmentValue ) {
    // Only support multi-line comment block
    if ( new RegExp( "\n" ).test( commentBlock ) ) {
        return commentBlock.replace(
            /\n     \*\//g,
            "\n     * @listens " + augmentValue + "\n     */"
        );
    }
};

exports.astNodeVisitor = {
    visitNode: function( node, e, parser, currentSourceName ) {
        var argumentValue;

        if ( 'Property' === node.type &&
             node.value.arguments &&
             node.value.callee.property &&
             'Identifier' === node.value.callee.property.type
        ) {
            // Process whitelist
            if ( 'on' === node.value.callee.property.name &&
                 'Literal' === node.value.arguments[0].type
            ) {
                argumentValue = node.value.arguments[0].value;
            }

            var lastNodeValueArgument = node.value.arguments[node.value.arguments.length-1];

            // Process any Ember.on() calls passed as last argument to Ember.*
            if ( whitelist.indexOf( node.value.callee.property.name ) > -1 &&
                 lastNodeValueArgument.callee &&
                 'on' === lastNodeValueArgument.callee.property.name
            ) {
                argumentValue = lastNodeValueArgument.arguments[0].value;
            }

            // Add @listens tag to comment block
            if ( undefined !== argumentValue ) {
                e.comment = addListensTagToComment( e.comment, argumentValue );
            }
        }
    }
};
