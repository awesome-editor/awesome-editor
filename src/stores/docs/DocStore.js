import {Channels} from '../constants/Constants'
import {registerStore} from 'rflux/AppState'

import {DocActions as Actions} from './DocConstants'
import * as Reducers from './DocReducers'
import * as ActionFunctions from './DocActionFunctions'

registerStore(
  Channels.docs,
  {Actions, Reducers, ActionFunctions, ActionObservables}
)
