import {Channels} from '../constants/Constants'
import registerSideEffects from '../../rflux/registerSideEffects'

import {StorageSideEffectTypes} from './StorageContants'
import * as ActionFuncs from './StorageActions'
import * as SideEffectHandlers from './StorageSideEffects'


registerSideEffects(
  Channels.storageSideEffects,
  StorageSideEffectTypes,
  {ActionFuncs, SideEffectHandlers}
)

