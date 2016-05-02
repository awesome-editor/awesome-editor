import {Channels} from '../constants/Constants'
import registerChannelReducers from '../../rflux/registerChannelReducers'
import registerStore from '../../rflux/registerStore'

// This is how you a create a store
// 1. import its action types, actions, reducers, and action observables
// 2. create the reducer
// 3. add reducer to _scanner
// 4. create the store
// 5. export the store in the default exported object
import {DocActionTypes as ActionTypes} from './DocConstants'
import * as ActionFuncs from './DocActions'
import * as ActionReducers from './DocReducers'
import * as ActionObservables from './DocActionObservables'


registerChannelReducers(
  'docs',
  Channels.docs,
  {ActionTypes, ActionReducers}
)

registerStore(
  'docs',
  {ActionFuncs, ActionObservables}
)
