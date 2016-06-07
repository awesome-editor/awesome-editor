import {Channels} from '../constants/Constants'
import {registerSideEffects} from 'rflux/AppState'

import {StorageSideEffectTypes as SideEffects} from './StorageContants'
import * as SideEffectActionFunctions from './StorageActions'
import * as SideEffectHandlers from './StorageSideEffects'


registerSideEffects(
  Channels.storageSideEffects,
  {SideEffects, SideEffectActionFunctions, SideEffectHandlers}
)

