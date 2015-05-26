/**
 * Adds @observes tag to those DocBlocks that should have it
 *
 * Ember.js Computed Properties {@link http://emberjs.com/api/classes/Ember.ComputedProperty.html} observe properties.
 * Without needing to populate @observes tags {@link https://github.com/notmessenger/jsdoc-plugins#observestag} this
 * plugin will automatically add them to the DocBlocks for you during documentation generation.
 */
'use strict';

exports.astNodeVisitor = {
    visitNode: function( node, e, parser, currentSourceName ) {
        var argumentValues = [];

        if ( 'Property' === node.type && node.value.arguments ) {

            // Gather up each observed property
            node.value.arguments.forEach( function( argument ) {
                if ( 'Literal' === argument.type ) {
                    argumentValues.push( argument.value );
                }
            });

            // Only support multi-line comment block
            if ( new RegExp( "\n" ).test( e.comment ) ) {
                e.comment = e.comment.replace(
                                /\n     \*\//g,
                                "\n     * @observes " + argumentValues.join(', ' ) + "\n     */"
                            );
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