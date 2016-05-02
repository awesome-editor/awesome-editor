import {Channels} from '../constants/Constants'
import registerSideEffects from '../../rflux/registerSideEffects'

import {TagSideEffectTypes} from './TagConstants'
import * as ActionFuncs from './TagActions'
import * as SideEffectHandlers from './TagSideEffects'


registerSideEffects(
  Channels.tagSideEffects,
  TagSideEffectTypes,
  {ActionFuncs, SideEffectHandlers}
)
