## Stores as Stream Observers, Part 2: FRP && ReactJS
### How the heck can stores "hold" state in FRP?

Before we talk about how Stores look like in *functional reactive programming (FRP)*, we need to discuss how Stores can even store/manage state in FRP. Technically speaking, in *functional programming (FP)*, functions are not supposed to store state between successive calls.

There are three strategies:

1. use `scan` (aka `reduce`).
2. move state to a global component, say `ApplicationState`.
3. a combination of the two

## Use the scan Luke

This approach is the most similar to Flux.

Basically, in FP, you get around not being able to store state by *passing around state (aka accumulating state) in function arguments*. For example, the code below shows the `factorial` function, FP style. Note how the function argument `acc` *accumulates* the result of successive function calls.

```javascript
function factorial(n, acc=1) {
    if (n <= 1) return acc
    return factorial(n-1, n*acc)
}
```

In FRP, you can store successive stream values using the `scan` function (which works just like `reduce`)

```javascript
//myStream = 0, 1, 2, 3, ...
const store = myStream.scan(
    (storedValues, curValue) => storedValues.concat[curValue], []
)

store.onValue(x => console.log(x))
// [0]
// [0, 1]
// [0, 1, 2]
// [0, 1, 2, 3]
// etc
```

### Solution 1: The Straightforward Approach

This leads to a straightforward implementation of a store:

```javascript
// TodoStore.js
import AppDispatcher from 'AppDispatcher'
import uuid from 'uuid' //module for generatin' IDs

// pull functionality into functions and export for easy testing
function _createTodo(todos, todo) {

    todo.id = uuid.v4() // easy-peasy way to get an id
    todos[id] = todo
    return todos
}

function _scanner(todos, action) {

    switch(action.actionType) {
        case 'create':
          return _createTodo(todos, action.payload)
        default:
          return todos;
    }
}

const todoStore = AppDispatcher
    .filter(x => x.channel === 'todo')
    .scan(_scanner, {})

export default {
    _createTodo,
    _scanner,
    todoStore
}
```

### Solution 2: Action Streams

Alternatively, we can create action streams for each action and merge them using the FRP library. For example:

```javascript
// yet another store
import AppDispatcher from 'AppDispatcher'
import uuid from 'uuid'
import Kefir from 'kefir'

const todoActions = AppDispatcher.filter(x => x.channel === 'todo')

// export for testing
// note that we return a higher-order function
function _createTodo(todos, action) {
    return function _createTodoFunction(todos) {
      const todo = action.payload
      todo.id = uuid.v4()
      todos[id] = todo
      return todos
  }
}

function _updateTodo(action) {
    return function _updateTodoFunction(todos) {
        const todo = action.payload
        todos[todo.id] = todo
        return todos
    }
}

const createActionStream = todoActions
    .filter(x => x.actionType === 'create')
    .map(_createTodo)

const updateActionStream = todoActions
    .filter(x => x.actionType === 'update')
    .map(_updateTodo)

// the way "merge" works in FRP libraries
// is that it fires each time one of the action
// streams receives an update
const todoStore = Kefir
  .merge([createActionStream, updateActionStream])
  .scan((todos, modificationFunction) => modificationFunction(todos), {})

export default {
    _createTodo,
    _updateTodo,
    createActionStream,
    updateActionStream,
    todoStore
}
```

### The Shootout: The Straightforward Approach vs Action Streams

The main advantages to action streams are

- an action can be anything. (On the other hand, I can't think of an action that can't be handled by the straightforward approach.)
- knowing when specific actions happened is trivial---just observe the action stream!

The main disadvantage to action streams is that the code is slightly harder to test---at the very least, you'll need to mock out the AppDispatcher so that you can test the action streams are hooked up correctly.

Actually, everything but the functions are boilerplate. You can write a helper to create the action streams. Then another helper can create the store. Then all the unit test needs to do is check that (1) the functions work as expected and (2) the helpers are called with the right arguments.

So there you have it---Stores in FRP. **In case you need remindin', we've been able to replicate Flux Stores using only stock FRP functionality!**

## Global State

This approach is the most radical since it diverges from Flux architecture.

In FP, an alternate solution to the state problem is create a data structure to represent the global state along with top-level functions that operate on the global state.

We had observed in the Action Stream Solution that most of the FRP code is boilerplate. With the Global State Solution, you essentially move the FRP code to a centralized location. Stores become (just) functions that operate on their domain.

```javascript
// TodoStore.js
function createTodo(action) {
    return function createTodoFunction(todos) {
      const todo = action.payload
      todo.id = uuid.v4()
      todos[id] = todo
      return todos
  }
}

export default {createTodo}
```

```javascript
// AppState.js

```
## Should stores be nothing but functions?

For example, (taken from [The Evolution of Flux Frameworks](https://medium.com/@dan_abramov/the-evolution-of-flux-frameworks-6c16ad26bb31#.vyv4sptff]))

```javascript
export default function TodoStore(state = initialState, action) {
  switch (action.type) {
  case ActionTypes.ADD_TODO:
    return { todos: state.todos.concat([action.text]) };
  default:
    return state;
}
```

The main justification is that this is super easy to test. I won't point out that *something* must tie these store functions together. I also won't point out that that *something* has to be tested.

But do these store functions buy you anything in FRP?

This is what a store can look like in FRP (taken from [React and RxJS](https://github.com/whiteinge/presentations/blob/master/react-rally_2015-08-24_react-rxjs/presentation.rst#rx-)):

```javascript
// myAjax stream that fetches a URL on REFRESH
var myAjaxStream = myStore
    .startWith({type: act.REFRESH})
    .filter(x => x.type === act.REFRESH)
    .flatMap(() => Rx.DOM.get('/some/url'))
    .shareReplay(1);
```

`myStore` is nothing but a stream. (In RxJS, it's a `subject`; in BaconJS, it's a `bus`; in KefirJS, it's the now-defunct `emitter`.)

To unit test the above code, all you need to do is override `myStore` and observe the results. Easy. Peasy.

## How should stores interact?

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

In the diagram, the dispatcher sends `EVENT` to StoreA and StoreB. However, before StoreB can do its update, it must wait for a message from StoreA that it's done.

In Flux, you need `waitFor` to model this relationship. In FRP, since stores are streams *that automagically emit events after updates*, all you need to do is this:

```javascript
// StoreB.js
import StoreA from 'StoreA'

export const updateStream = dispatcher
                .filter(x => x.type === act.EVENT)
                .sampledBy(StoreA.updateStream)
                .map(x => {value: x.payload})
```

From experience, in a complex system, this doesn't work---it's difficult to map the interrelationships between stores and you get a system that's hard to reason about.

Another way of looking at it is that StoreA needs to mutate global state. We need a slick way.

In [Purely Functional Retrogames](http://prog21.dadgum.com/26.html), Hague talks about creating a Pacman clone using FRP. The `PacmanStore` (if there were one) would update the Pacman state as a result of actions like user movement. There's a dilemma, however. Who should update world state when Pacman changes? `PacmanStore`?

*Not directly*

Instead of mutating global state directly (a *side effect*), the `PacmanStore` should publish a message telling what happened.

Of course, we're not talking about (just) `PacmanStore`'s. We're talking about Web apps. A store should not mutate global state directly. Instead it should publish a message telling what happened and something else, say `ApplicationState` should be in charge of managing global state.

With FRP, publishing a message is easy. No extra boilerplate required. Using the example above, `myAjaxStream` is a stream that fires only on REFRESH events. Therefore, all `ApplicationState` needs to do is *observe* (aka subscribe) `myAjaxStream` to get messages.

```javascript
// ApplicationState
myAjaxStream.onValue(() => {

    //do a side effect, like disable Save button
})
```

## Notes

```javascript
var flightDispatcher = Kefir.emitter()
var CountryStore = flightDispatcher
    .filter(p => p.actionType === 'country-update')
    .map(p => {country: p.selectedCountry})

\\cityStore
var CityUpdate = flightDispatcher
    .filter(payload => payload.actionType === 'city-update')
    .map(payload => {city: payload.selectedCity})

const CountryUpdate = flightDispatcher
    .filter(payload => payload.actionType === 'country-update')
    .flatMap(CountryStore.getDefaultCityForCountry).sampledBy(CountryStore.countryStream)
    .map(payload => {city: payload.selectedCity})

const CityStore = Kefir.merge([CityUpdate, CountryUpdate]).scan((state, update) => {
    return Object.assign(state, update)
})

var FlightPriceStore

flightDispatcher.emit({
  actionType: 'city-update',
  selectedCity: 'paris'
});
```

```javascript
// model 1
const model1 = userInput
              .map(x => 'model1')

// model 2
const model2 = model1
               .map(x => 'model2')

```
