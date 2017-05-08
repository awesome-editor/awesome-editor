import {Channels} from '../constants/Constants'

import {StorageSagas as Sagas} from './StorageContants'
import * as SagaActionFunctions from './StorageSagaActionFunctions'
import * as SagaHandlers from './StorageSagaHandlers'


export const storageSagas = {
  channel: Channels.storageSagas,
  Sagas,
  SagaActionFunctions,
  SagaHandlers
}

