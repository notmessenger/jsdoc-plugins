
# defaultTag

Adds `@default` tag to those DocBlocks that should have it

From a code comment perspective the `@default` tag does not add much value when viewing it inline.  However it does
have value in the documentation it assists in generating.  This plugin allows you to not have to include the
`@default` tag in DocBlocks that are not for complex data types and have it be automatically added to the DocBlocks
for you during documentation generation.

# observesTag

Adds support for @observes tag

The use of this tag is inspired by the [Ember.js Computed Property](http://emberjs.com/api/classes/Ember.ComputedProperty.html).
By specifying this tag, followed by a list of properties being observed (comma-seperated by convention), the properties
a computed property (or other similar manifestations of this pattern) is observing can be captured and displayed in the
generated documentation.

In order for this tag to display in the generated documentation you will need to modify the `/method.tmpl` file to
include:

```
<?js if (data.observes) { ?>
    <h5>Observes:</h5>
    <ul>
        <li><?js= data.observes ?></li>
    </ul>
<?js } ?>
```

# emberObservesTag

Adds @observes tag to those DocBlocks that should have it

[Ember.js Computed Properties](http://emberjs.com/api/classes/Ember.ComputedProperty.html) observe properties.
So do [Ember.js Observers](http://guides.emberjs.com/v1.10.0/object-model/observers/).  Without needing to populate
[@observes tags](https://github.com/notmessenger/jsdoc-plugins#observestag) this
plugin will automatically add them to the DocBlocks for you during documentation generation.

This plugin supports both the prototype and non-prototype extension syntax:

```
fullName: function() {
    ...
}.property( 'firstName', 'lastName' ),

fullerName: Ember.computed( 'firstName', 'lastName', function() {
    ...
}),

watches: function() {
    ...
}.observes( 'firstName', 'lastName' ),

watchesMore: Ember.observer( 'firstName', 'lastName', function() {
    ...
})
```

It will also respect these properties when contained within an `Ember.on()` call, such as:

```
onThenObserver: Ember.on(
    'didInsertElement',
    Ember.observer(
        'propertyName',
        function() {
            ...
        }
    )
)
```

In order for this tag to display in the generated documentation you will need to modify the `/method.tmpl` file to
include:

```
<?js if (data.observes) { ?>
    <h5>Observes:</h5>
    <ul>
        <li><?js= data.observes ?></li>
    </ul>
<?js } ?>
```

# emberListensTag

Adds @listens tag to those DocBlocks that should have it

The [Ember.js on()](http://emberjs.com/api/classes/Ember.Evented.html#method_on) method subscribes to a named event with
given function. Without needing to populate [@listens tags](http://usejsdoc.org/tags-listens.html) this plugin will
automatically add them to the DocBlocks for you during documentation generation.

This plugin supports both the prototype and non-prototype extension syntax:

```
initializer: function() {
    ...
}.on( 'property' )

anotherInitalizer: Ember.on( 'property', function() {
    ...
})
```

It will also respect these properties when contained within an `Ember.observer()` or `Ember.computed()` calls, such as:

```
observeThenOn: Ember.observer(
    'property',
    Ember.on(
        'didInsertElement',
        function() {
            ...
        }
    )
)
```
