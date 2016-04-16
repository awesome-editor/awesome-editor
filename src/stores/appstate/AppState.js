import AppDispatcher from './../../app/AppDispatcher'
import {Channels} from '../constants/Constants'
import createStore from './../../app/createStore'
import createReducers from '../../app/createReducers'
//import {combine} from '../../app/StateWithSideEffects'


const appStateObservable = AppDispatcher
  .scan(_scanner, {})
  .onValue(() => undefined)

// This is how you a create a store
// 1. import its action types, actions, reducers, and action observables
// 2. create the reducer
// 3. add reducer to _scanner
// 4. create the store
// 5. export the store in the default exported object
import {DocActionTypes} from '../docs/DocConstants'
import * as DocActions from '../docs/DocActions'
import * as DocReducers from '../docs/DocReducers'
import * as DocActionObservables from '../docs/DocActionObservables'

const docReducers = createReducers(
  'docs',
  Channels.docs,
  {actionTypes: DocActionTypes, actionReducers: DocReducers}
)
const docStore = createStore(
  'docs',
  {actionFuncs: DocActions, actionObservables: DocActionObservables},
  {AppDispatcher, appStateObservable}
)

function _scanner(state, action) {

  // reducers take the whole state as input but return only the store state
  // this allows you to #combine different reducers
  const newState = docReducers(state, action)

  return {
    ...newState.state,
    sideEffects: newState.sideEffects
  }
}


/**
 * This is the "public" interface for app state i.e., what React interfaces with.
 */
export default {
  appStateObservable,
  ...docStore
}
