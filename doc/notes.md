
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

## The Naive Way
The above is the naive way of doing sideffects. You get the ability to pass
messages between stores in a clean way. You get also get side effects but lose
testability. This is the simplest sideffect:

```javascript
function fetchDoc(uuid) {
    AppDispatcher.emit({actionType: 'fetchingDoc'}) //broadcast to world
    fetch(url, uuid).then(doc => {
       AppDispatcher.emit({actionType: 'docFetched', payload: doc})
    })
}
```

In case you haven't noticed, `fethcDoc` isn't a pure function so
it's hard (though not impossible to test). This is problematic because
side effects can quickly become very complex. In the current system,
it's also a pain to call---to keep the system (views and stores) pure,
you need call this method by dispatching an Action, not by calling it directly.

What if `fetchDoc` looked like this?

```javascript
import {emit, call} from //...

function fetchDoc(uuid) {
   emit({actionType: 'fetchingDoc'})
   
   // We technically need to unsubscribe the onValue callback
   // However, if we make #call take(1), then unsub isn't needed
   
   call(fetch, url, uuid).onValue(
     doc => emit({actionType: 'docFetched', payload: doc})
   )
}
```
where `emit` and `call` push values to a side effect bus/emitter/subject
called `sideEffects`? Then testing can look like this:

```javascript
it('should fetch a doc', function(done) {
  
  sideEffects
    .take(3).
    .reduce((total, value) => total.concat([value]), [])
    .onValue(values => {
  
       expect(values[0]).toEqual({action: 'emit', actionType: 'fetchingDoc'})
       expect(values[1]).toEqual({action: 'call', fn: fetch, args: [url, uuid])
       expect(values[2]).contains({action: 'emit', actionType: 'docFetched'})
              
       done()
    })
  
  fetchDoc(uuid)
})
```

Notice that we're not testing the payload of the call to `fetch`. 
To do that we need to mock out `call`---that's slightly better than
mocking `fetch` because the same mock pattern works for any function.

On the plus side, `fetchDoc` is a pure function so can be called directly. 

Let's implement `emit` and `call`

```javascript
// sideEffects.js
const sideEffects = kefirEmitter()

const emitObs = sideEffects
  .filter(action => action.action === 'emit')
  .map(action => 
    Object.assign({}, {actionType: actionType}, {payload: action.payload})
  .onValue(AppDispatcher.emit)

const callObs = sideEffects
  .filter(action => action.action === 'call')
  .flatMap(
    action => combineTemplate({uuid: action.uuid, rslt: action.fn(...action.args))})
  )
  
export function emit(action) {
  
  sideEffects.emit(Object.assign({action: 'emit'}, action))
}

export function call(fn, ...args) {

  const id = uuid.v4()
  sideEffects.emit({action: 'call', fn, args, uuid: id})
  
  return callObs.filter(fn => fn.uuid === id).take(1).map(fn => fn.rslt)
}
```

## The Saga Continues

The above pattern is called a Saga. (Well, actually, there's some debate as to what a saga is.
But it's just a long-running process that can be divided up into
independent parts.) For ReactJS, it's important that a Saga be made of 
pure functions. What's missing is the ability to combine sagas.


## Sagas vs Streams

```javascript
import { fork, call, take, put } from 'redux-saga/effects'
import Api from '...'

function* authorize(user, password) {
  try {
    const token = yield call(Api.authorize, user, password)
    yield put({type: 'LOGIN_SUCCESS', token})
  } catch(error) {
    yield put({type: 'LOGIN_ERROR', error})
  }
}

function* loginFlow() {
  while(true) {
    const {user, password} = yield take('LOGIN_REQUEST')
    yield fork(authorize, user, password)
    yield take(['LOGOUT', 'LOGIN_ERROR'])
    yield call(Api.clearItem('token'))
  }
}
```

```javascript
// const put = AppDipatcher.emit
// const call = func, ...args => func.apply(func, args)
// const listen = actionType => AppDispatcher.filter(action => action.actionType === acitonType)
import {put, call, listen} from // ...

function authorize(user, password) {

  return call(Api.authorize, user, password)
    .take(1)
    .onError(error => put({type: 'LOGIN_ERROR', error)_
}

function loginFlow() {

   const loginStream = listen('LOGIN_REQUEST')
   const logoutStream = listen('LOGOUT')
   const authStream = loginStream.flatMapLatest(({user, password}) => call(authorize, user, password))
   
   Kefir.merge([loginStream, logoutStream, authorizeStream])
     .scan((state, event) => {
       return event.actionType !== 'auth' ? 
         {state: event.actionType, event} : 
         {state, event}
       }, {})
     .filter(state => !(state.state !== 'login' && state.event.actionType === 'auth'))
     .map(state => state.event)
     .onValue(event => {
        switch(event.actionType) {
          case 'AUTHORIZE' : put({type: 'LOGIN_SUCESS', event.payload)
          case 'LOGOUT': call(Api.clearItem, 'token')_
        }
     })
     
}
```


Common case
    loginStream: -------------------o---->
authorizeStream: ---------------a-------->
   logoutStream: ---------l-------------->
    errorStream: ------------------------>

Edge case
    loginStream: -------------------o---->
authorizeStream: --------a--------------->
   logoutStream: -------------l---------->
    errorStream: ------------------------>


### Unit Tests
OK so generators win here. The reason is because a generator is a stream
that can be paused. Also if I'm not mistaken, you can also override generated values.
This makes for testing Sagas super easy:

```javascript
describe('saga', () => {
   
   const saga = iAmASaga()
   
   //assuming tests run in sequence
   
   it('should return first value', () => {
       
      expect(saga.next()).toEqual(//...)
   }
   
   it('should return second value, () => {
   
      expect(saga.next()).toEqual(//...)
   })
})
```

With streams you do something similar by introducing an intermediate stream 
used for iteration i.e., instead of calling AppDispatcher directly, 
output all calls to an iteration stream. You can then (mostly) write
code like above:

```javascript
//stream.saga.js

export default iterator = Kefir.emitter()

export const put = iterator.emit
export call = (func, ...args) => put({type: 'PUT', payload: {func, args: ...args})
// still need to listen to the app dispatcher
export listen = actionType => AppDispatcher.filter(action => action.actionType === acitonType)

iterator.onValue(action => {
   
   switch(action.type) {
   
     case 'PUT': 
   }
   
})
```


