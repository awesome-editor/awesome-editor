import {Channels} from '../constants/Constants'
import registerChannelReducers from '../../rflux/registerChannelReducers'
import registerStore from '../../rflux/registerStore'
import registerSideEffects from '../../rflux/registerSideEffects'

import {DocActionTypes as ActionTypes, DocSideEffectTypes} from './DocConstants'
import * as ActionFuncs from './DocActions'
import * as ActionReducers from './DocReducers'
import * as ActionObservables from './DocActionObservables'
import * as SideEffectHandlers from './DocSideEffects'


registerChannelReducers(
  'docs',
  Channels.docs,
  {ActionTypes, ActionReducers}
)

registerStore(
  'docs',
  {ActionFuncs, ActionObservables}
)

registerSideEffects(
  Channels.docSideEffects,
  DocSideEffectTypes,
  {ActionFuncs, SideEffectHandlers}
)
