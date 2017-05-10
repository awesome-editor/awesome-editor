import {Channels} from '../constants/Constants'

import {StorageSagas as ActionTypes} from './StorageContants'
import * as SagaActionFunctions from './StorageSagaActionFunctions'
import SagaHandlersFn from './StorageSagaHandlers'


export const storageSagas = {
  channel: Channels.storageSagas,
  ActionTypes,
  SagaActionFunctions,
  SagaHandlersFn: sagaInterface => SagaHandlersFn(sagaInterface)
}

