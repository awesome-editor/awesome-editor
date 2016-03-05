
## Store Interaction, Part 4: FRP && ReactJS

```ditaa
Complex Relationship
 +------------+      +--------+
 | Dispatcher |----->| StoreB |
 +------------+      +--------+
        |                ^
        |                |
        |            +--------+
        +----------->| StoreA |
                     +--------+
```

In the diagram, the dispatcher sends `EVENT` to StoreA and StoreB.
However, before StoreB can do its update, it must wait for a message from StoreA that it's done.

In Flux, you use `waitFor` to model this relationship.
In FRP, if you use action streams, you can do something like this:

```javascript
// StoreB.js
import StoreA from 'StoreA'

export const updateStream = dispatcher
                .filter(x => x.type === act.EVENT)
                .zip(StoreA.updateStream) // t[0] = x.payload, t[1] = storeA value
                .map(t => {value: computeValueFromA(t[0].payload, t[1])})
```

From experience, in a complex system, this doesn't work---you get a system that's
hard to reason about. Store relationships are not clear and scattered all over the place.

So is there a better way?

What's really going on is that StoreA needs to do a side effect (update StoreB).
Fortunately, the functional-programming community has a well-known way of handling
side effects---monads.

### Freakin. Monads.

Unfortunately, "monads" has become a curse word.
Part of the problem is that the online tutorials often hide what is a very simple concept behind complex (math) language. Another problem is that the same tutorials often
assume you know Haskell.

For the purposes of this post, all you need to know about "monads" and "Category theory"
is that they provide a rigorous mathematical theory (a toolbox if you will)
for common programming problems. In particular, the "monad solution" for side effects
is to have functions return a list of instructions to perform, for example, update
`StoreB` and persist the current value:

```javascript
function update(newValue) {

    return {
        newValue,
        sideEffects: [
            {channel: 'StoreB', actionType: 'update', payload: {storeA: newValue}},
            {channel: 'Persistance', actionType: 'updateStoreA', payload: newValue}
        ]
    }
}
```

"side effects" are just plain, old messages that the global state store can route
to the app dispatcher.

What does this buy us? Because side effects make their way through the app dispatcher,
we can still

- *time travel*---go back to any app state.
- log all actions
- record and replay actions
