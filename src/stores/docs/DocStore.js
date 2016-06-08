import {Channels} from '../constants/Constants'
import {registerStore} from 'rflux/AppState'
import {registerSagas} from 'rflux/AppState'

import {DocActions as Actions, DocSagas as Sagas} from './DocConstants'
import * as Reducers from './DocReducers'
import * as ActionFunctions from './DocActionFunctions'
import * as ActionObservables from './DocActionObservables'
import * as SagaActionFunctions from './DocSagaActionFunctions'
import * as SagaHandlers from './DocSagaHandlers'


registerStore(
  'docs',
  {Actions, Reducers, ActionFunctions, ActionObservables}
)

registerSagas(
  Channels.docSagas,
  {Sagas, SagaActionFunctions, SagaHandlers}
)
