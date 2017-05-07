import {Channels} from '../constants/Constants'

import {TagSagas as Sagas, TagActions as ActionTypes} from './TagConstants'
import * as Reducers from './TagReducers'
import * as ActionFunctions from './TagActionFunctions'
import * as SagaActionFunctions from './TagSagaActionFunctions'
import * as SagaHandlers from './TagSagaHandlers'
import appStateFactory from '../index'


const {registerSagas, registerStore} = appStateFactory

registerStore(
  Channels.tags,
  {ActionTypes, Reducers, ActionFunctions}
)

registerSagas(
  Channels.tagSagas,
  {Sagas, SagaActionFunctions, SagaHandlers}
)
