import {Channels} from '../constants/Constants'

import {DocActions as ActionTypes} from './DocConstants'
import * as Reducers from './DocReducers'
import * as ActionFunctions from './DocActionFunctions'
import * as ActionObservables from './DocActionObservables'

export const docStore = {
  channel: Channels.docs,
  ActionTypes,
  Reducers,
  ActionFunctions,
  ActionObservables
}
