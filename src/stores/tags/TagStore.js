import {Channels} from '../constants/Constants'

import {TagSagas as Sagas, TagActions as ActionTypes} from './TagConstants'
import * as Reducers from './TagReducers'
import * as ActionFunctions from './TagActionFunctions'
import * as SagaActionFunctions from './TagSagaActionFunctions'
import * as SagaHandlers from './TagSagaHandlers'


export const tagStore = {
  channel: Channels.tags,
  ActionTypes,
  Reducers,
  ActionFunctions
}

export const tagSagas = {
  channel: Channels.tagSagas,
  Sagas,
  SagaActionFunctions,
  SagaHandlers
}
