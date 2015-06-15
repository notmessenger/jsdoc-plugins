/**
 * Adds @observes tag to those DocBlocks that should have it
 *
 * Ember.js Computed Properties {@link http://emberjs.com/api/classes/Ember.ComputedProperty.html} observe properties.
 * Without needing to populate @observes tags {@link https://github.com/notmessenger/jsdoc-plugins#observestag} this
 * plugin will automatically add them to the DocBlocks for you during documentation generation.
 */
'use strict';

var whitelist = [
    'computed',
    'observer',
    'observes',
    'property'
];

var addObservesTagToComment = function( commentBlock, augmentValues ) {
    // Only support multi-line comment block
    if ( new RegExp( "\n" ).test( commentBlock ) ) {
        return commentBlock.replace(
            /\n     \*\//g,
            "\n     * @observes " + augmentValues.join(', ' ) + "\n     */"
        );
    }
};

exports.astNodeVisitor = {
    visitNode: function( node, e, parser, currentSourceName ) {
        var argumentValues = [];

        if ( 'Property' === node.type &&
             node.value.arguments &&
             'Identifier' === node.value.callee.property.type
        ) {

            // Process whitelist
            if ( whitelist.indexOf( node.value.callee.property.name ) > -1 ) {
                node.value.arguments.forEach( function( argument ) {
                    if ( 'Literal' === argument.type ) {
                        argumentValues.push( argument.value );
                    }
                });
            }

            var lastNodeValueArgumentsPosition = node.value.arguments.length-1;

            // Process any Ember.* calls provided as last argument to Ember.on()
            if ( 'on' === node.value.callee.property.name &&
                 node.value.arguments[lastNodeValueArgumentsPosition].callee &&
                 whitelist.indexOf( node.value.arguments[lastNodeValueArgumentsPosition].callee.property.name ) > -1
            ) {
                node.value.arguments[lastNodeValueArgumentsPosition].arguments.forEach( function( argument ) {
                    if ( 'Literal' === argument.type ) {
                        argumentValues.push( argument.value );
                    }
                });
            }

            // Add @observes tag to comment block
            if ( argumentValues.length > 0 ) {
                e.comment = addObservesTagToComment( e.comment, argumentValues );
            }
        }
    }
};

/**
 * Adds support for @observes tag
 *
 * This tag will display the properties being observed by an Ember.js Computed Property
 * {@link http://emberjs.com/api/classes/Ember.ComputedProperty.html} in the generated documentation.
 */
exports.defineTags = function( dictionary ) {
    dictionary.defineTag( 'observes', {
        mustHaveValue: false,
        canHaveType: false,
        canHaveName: false,
        onTagged: function( doclet, tag ) {
            doclet.observes = tag.value;
        }
    });
};