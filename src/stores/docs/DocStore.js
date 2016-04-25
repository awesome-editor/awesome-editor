import {Channels} from '../constants/Constants'
import registerReducer from '../../app/registerReducer'

// This is how you a create a store
// 1. import its action types, actions, reducers, and action observables
// 2. create the reducer
// 3. add reducer to _scanner
// 4. create the store
// 5. export the store in the default exported object
import {DocActionTypes} from '../stores/app/App'
import * as DocActions from '../stores/docs/DocActions'
import * as DocReducers from '../stores/docs/DocReducers'
import * as DocActionObservables from '../stores/docs/DocActionObservables'


registerReducer(
  'docs',
  Channels.docs,
  {actionTypes: DocActionTypes, actionReducers: DocReducers}
)

//registerStore(
//  'docs',
//  {actionFuncs: DocActions, actionObservables: DocActionObservables},
//  {AppDispatcher, appStateObservable}
//)
