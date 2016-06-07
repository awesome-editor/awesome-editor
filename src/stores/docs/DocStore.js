import {Channels} from '../constants/Constants'
import {registerStore} from 'rflux/AppState'
import registerSideEffects from '../../rflux/registerSideEffects'

import {DocActionTypes as Actions, DocSideEffectTypes} from './DocConstants'
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
  DocSideEffectTypes,
  {ActionFuncs, SideEffectHandlers}
)
