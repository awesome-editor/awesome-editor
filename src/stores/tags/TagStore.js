import {Channels} from '../constants/Constants'
import {registerSideEffects} from 'rflux/AppState'
import {registerStore} from 'rflux/AppState'

import {TagSideEffectTypes as SideEffects, TagActionTypes as Actions} from './TagConstants'
import * as Reducers from './TagReducers'
import * as ActionFunctions from './TagActions'
import * as SideEffectHandlers from './TagSideEffects'


registerStore(
  'tags',
  {Actions, Reducers, ActionFunctions}
)

registerSideEffects(
  Channels.tagSideEffects,
  {SideEffects, SideEffectHandlers, SideEffectActionFunctions: ActionFunctions}
)
