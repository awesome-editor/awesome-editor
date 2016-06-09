import {Channels} from '../constants/Constants'
import {registerSagas} from 'rflux/AppState'
import {registerStore} from 'rflux/AppState'

import {TagSagas as Sagas, TagActions as Actions} from './TagConstants'
import * as Reducers from './TagReducers'
import * as ActionFunctions from './TagActionFunctions'
import * as SagaActionFunctions from './TagSagaActionFunctions'
import * as SagaHandlers from './TagSagaHandlers'


registerStore(
  Channels.tags,
  {Actions, Reducers, ActionFunctions}
)

registerSagas(
  Channels.tagSagas,
  {Sagas, SagaActionFunctions, SagaHandlers}
)
