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
import {AppActionTypes as ActionTypes, AppSideEffectTypes as SideEffectTypes} from './AppConstants'
import * as ActionFuncs from './AppActions'
import * as ActionReducers from './AppReducers'
import * as ActionObservables from './AppActionObservables'
import * as SideEffectHandlers from './AppSideEffects'


registerChannelReducers(
  'app',
  Channels.app,
  {ActionTypes, ActionReducers}
)

registerStore(
  'app',
  {ActionFuncs, ActionObservables}
)

registerSideEffects(
  Channels.appSideEffects,
  SideEffectTypes,
  {ActionFuncs, SideEffectHandlers}
)
