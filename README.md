# statefulObjects

Plain objects that can have callbacks subscribed to their properties.

# Usage

```javascript
var q = statefulObject( { foo : 'bar', widgets : 'doodads' } );

q.foo;    // 'widgets'

q.subscribe.foo( 'hello', () => alert(q.foo) );

q.foo = 'blah';   // alerts 'blah'
```
