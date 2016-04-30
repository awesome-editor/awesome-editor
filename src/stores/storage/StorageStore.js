import {Channels} from '../constants/Constants'
import registerSideEffects from '../../rflux/registerSideEffects'

import {StorageSideEffectTypes} from './StorageContants'
import * as sideEffectActionFuncs from './StorageActions'
import * as sideEffectHandlers from './StorageSideEffects'


registerSideEffects(
  Channels.storageSideEffects,
  StorageSideEffectTypes,
  {sideEffectActionFuncs, sideEffectHandlers}
)

