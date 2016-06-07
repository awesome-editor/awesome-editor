import {Channels} from '../constants/Constants'
import {registerStore} from 'rflux/AppState'
import {registerSideEffects} from 'rflux/AppState'

import {DocActionTypes as Actions, DocSideEffectTypes as SideEffects} from './DocConstants'
import * as Reducers from './DocReducers'
import * as ActionFunctions from './DocActions'
import * as ActionObservables from './DocActionObservables'
import * as SideEffectHandlers from './DocSideEffects'


registerStore(
  'docs',
  {Actions, Reducers, ActionFunctions, ActionObservables}
)

registerSideEffects(
  Channels.docSideEffects,
  {SideEffects, SideEffectHandlers, SideEffectActionFunctions: ActionFunctions}
)
