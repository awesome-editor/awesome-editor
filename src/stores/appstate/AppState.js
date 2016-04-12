import AppDispatcher from './../../app/AppDispatcher'
import {Channels} from '../constants/Constants'
import createStore from './../../app/createStore'
import createReducers from '../../app/createReducers'

// This is how you a create a store
// 1. import its action types, actions, reducers, and action observables
// 2. create the reducer
// 3. create the store
// 4. export the store in the default exported object
import {DocActionTypes} from '../docs/DocConstants'
import * as DocActions from '../docs/DocActions'
import * as DocReducers from '../docs/DocReducers'
import * as DocActionObservables from '../docs/DocActionObservables'

const docs = createReducers(Channels.docs, DocActionTypes, DocReducers)

const initialState = {
  persistence: {},
  sideEffects: []
}

function _scanner(state, action) {

  const docsResult = docs(state.docs, action)

  const sideEffects = docsResult.sideEffects

  return {
    docs: docsResult.state,
    sideEffects
  }
}

const appStateObservable = AppDispatcher
  .scan(_scanner, initialState)
  .onValue(state => {

    setTimeout(() => state.sideEffects.forEach(sideEffect => AppDispatcher.emit(sideEffect)), 0)
  })


const docStore = createStore({
  storeName: 'docs',
  appDispatcher: AppDispatcher,
  appStateObservable,
  actionObservables: DocActionObservables,
  actions: DocActions
})

/**
 * This is the "public" interface for app state i.e., what React interfaces with.
 */
export default {

  appStateObservable,

  ...docStore
}
