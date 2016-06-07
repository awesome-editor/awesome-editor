import {Channels} from '../constants/Constants'
import registerSideEffects from '../../rflux/registerSideEffects'
import {registerStore} from 'rflux/AppState'

import {TagSideEffectTypes, TagActionTypes as Actions} from './TagConstants'
import * as Reducers from './TagReducers'
import * as ActionFunctions from './TagActions'
import * as SideEffectHandlers from './TagSideEffects'


registerStore(
  'tags',
  {Actions, Reducers, ActionFunctions}
)

registerSideEffects(
  Channels.tagSideEffects,
  TagSideEffectTypes,
  {ActionFuncs, SideEffectHandlers}
)
