import {Channels} from '../constants/Constants'
import registerChannelReducers from '../../rflux/registerChannelReducers'
import registerSideEffects from '../../rflux/registerSideEffects'
import registerStore from '../../rflux/registerStore'

// This is how you a create a store
// 1. import its action types, actions, reducers, and action observables
// 2. create the reducer
// 3. add reducer to _scanner
// 4. create the store
// 5. export the store in the default exported object
import {AppActionTypes, AppSideEffectTypes} from './AppConstants'
import * as AppActions from './AppActions'
import * as AppReducers from './AppReducers'
import * as AppActionObservables from './AppActionObservables'
import * as AppSideEffects from './AppSideEffects'


registerChannelReducers(
  'app',
  Channels.app,
  {actionTypes: AppActionTypes, actionReducers: AppReducers}
)

registerStore(
  'app',
  {actionFuncs: AppActions, actionObservables: AppActionObservables}
)

registerSideEffects(
  Channels.appSideEffects,
  AppSideEffectTypes,
  {sideEffectActionFuncs: AppActions, sideEffectHandlers: AppSideEffects}
)
