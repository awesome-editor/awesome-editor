import {Channels} from '../constants/Constants'
import registerSideEffects from '../../rflux/registerSideEffects'

import {TagSideEffectTypes} from './TagConstants'
import * as sideEffectActionFuncs from './TagActions'
import * as sideEffectHandlers from './TagSideEffects'


registerSideEffects(
  Channels.tagSideEffects,
  TagSideEffectTypes,
  {sideEffectActionFuncs, sideEffectHandlers}
)
