/**
 * Adds @default tag to those DocBlocks that should have it
 *
 * From a code comment perspective the @default tag does not add much value when viewing it inline.  However it does
 * have value in the documentation it assists in generating.  This plugin allows you to not have to include the
 * @default tag in DocBlocks that are not for complex data types and have it be automatically added to the DocBlocks
 * for you during documentation generation.
 */
'use strict';

exports.astNodeVisitor = {
    visitNode: function( node, e, parser, currentSourceName ) {
        var openingBracePosition,
            closingBracePosition,
            type;

        if ( 'Property' === node.type && 'Literal' === node.value.type && node.leadingComments ) {

            // Multi-line comment block
            if ( new RegExp( "\n" ).test( e.comment ) ) {
                e.comment = e.comment.replace(
                                /\n     \*\//g,
                                "\n     * @default " + e.astnode.value.raw + "\n     */"
                            );

            // Single-line comment block
            } else {

                openingBracePosition = e.comment.indexOf( '{' );
                closingBracePosition = e.comment.indexOf( '}' );
                type = e.comment.substr( openingBracePosition+1, closingBracePosition - openingBracePosition - 1 );

                e.comment = "/**\n * @type {" + type + "}\n * @default " + e.astnode.value.raw + "\n */";
            }
        }
    }
};