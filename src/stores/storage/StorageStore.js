import {Channels} from '../constants/Constants'
import {registerSagas} from 'rflux/AppState'

import {StorageSagas as Sagas} from './StorageContants'
import * as SagaActionFunctions from './StorageSagaActionFunctions'
import * as SagaHandlers from './StorageSagaHandlers'


registerSagas(
  Channels.storageSagas,
  {Sagas, SagaActionFunctions, SagaHandlers}
)

