import {Channels} from '../constants/Constants'

// This is how you a create a store
// 1. import its action types, actions, reducers, and action observables
// 2. create the reducer
// 3. add reducer to _scanner
// 4. create the store
// 5. export the store in the default exported object
import {AppActions as ActionTypes, AppSideEffects} from './AppConstants'
import * as Reducers from './AppReducers'
import * as ActionFunctions from './AppActionFunctions'
import * as ActionObservables from './AppActionObservables'
import * as SagaActionFunctions from './AppSagaActionFunctions'
import SagaHandlersFn from './AppSagaHandlers'


export const appStore = {
  channel: Channels.app,
  ActionTypes,
  Reducers,
  ActionFunctions,
  ActionObservables
}

export const appSagas = {
  channel: Channels.appSagas,
  ActionTypes: AppSideEffects,
  SagaActionFunctions,
  SagaHandlersFn: sagaInterface => SagaHandlersFn(sagaInterface)
}
