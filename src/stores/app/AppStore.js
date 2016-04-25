import {Channels} from '../constants/Constants'
import registerReducer from '../../app/registerReducer'
import registerSideEffects from '../../app/registerSideEffects'

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


registerReducer(
  'app',
  Channels.app,
  {actionTypes: AppActionTypes, actionReducers: AppReducers}
)

//registerStore(
//  'docs',
//  {actionFuncs: DocActions, actionObservables: DocActionObservables},
//  {AppDispatcher, appStateObservable}
//)

registerSideEffects(
  Channels.appSideEffects,
  AppSideEffectTypes,
  {sideEffectHandlers: AppSideEffects}
)
