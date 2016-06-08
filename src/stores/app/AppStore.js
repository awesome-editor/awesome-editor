import {Channels} from '../constants/Constants'
import {registerSagas} from 'rflux/AppState'
import {registerStore} from 'rflux/AppState'

// This is how you a create a store
// 1. import its action types, actions, reducers, and action observables
// 2. create the reducer
// 3. add reducer to _scanner
// 4. create the store
// 5. export the store in the default exported object
import {AppActions as Actions, AppSideEffects as Sagas} from './AppConstants'
import * as Reducers from './AppReducers'
import * as ActionFunctions from './AppActionFunctions'
import * as ActionObservables from './AppActionObservables'
import * as SagaActionFunctions from './AppSagaActionFunctions'
import * as SagaHandlers from './AppSagas'


registerStore(
  'app',
  {Actions, Reducers, ActionFunctions, ActionObservables}
)

registerSagas(
  Channels.appSagas,
  {Sagas, SagaActionFunctions, SagaHandlers}
)
