/**
 * Adds support for @observes tag
 *
 * The use of this tag is inspired by the Ember.js Computed Property
 * {@link http://emberjs.com/api/classes/Ember.ComputedProperty.html}.  By specifying this tag, followed by a list of
 * properties being observed (comma-seperated by convention), the properties a computed property (or other similar
 * manifestations of this pattern) is observing can be captured and displayed in the generated documentation.
 */
'use strict';

exports.defineTags = function( dictionary ) {
    dictionary.defineTag( 'observes', {
        mustHaveValue: true,
        canHaveType: false,
        canHaveName: false,
        onTagged: function( doclet, tag ) {
            doclet.observes = tag.value;
        }
    });
};