import {Channels} from '../constants/Constants'
import appStateFactory from '../index'

import {StorageSagas as Sagas} from './StorageContants'
import * as SagaActionFunctions from './StorageSagaActionFunctions'
import * as SagaHandlers from './StorageSagaHandlers'


const {registerSagas} = appStateFactory

registerSagas(
  Channels.storageSagas,
  {Sagas, SagaActionFunctions, SagaHandlers}
)

