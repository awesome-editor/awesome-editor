import {Channels} from '../constants/Constants'
import registerSideEffects from '../../rflux/registerSideEffects'
import registerStore from '../../rflux/registerStore'
import registerChannelReducers from '../../rflux/registerChannelReducers'

import {TagSideEffectTypes, TagActionTypes as ActionTypes} from './TagConstants'
import * as ActionFuncs from './TagActions'
import * as ActionReducers from './TagReducers'
import * as SideEffectHandlers from './TagSideEffects'


// TODO make register reducers part of register store
registerChannelReducers(
  'tags',
  Channels.tags,
  {ActionTypes, ActionReducers}
)

registerStore(
  'tags',
  {ActionFuncs}
)

registerSideEffects(
  Channels.tagSideEffects,
  TagSideEffectTypes,
  {ActionFuncs, SideEffectHandlers}
)
