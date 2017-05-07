import {Channels} from '../constants/Constants'

import {DocActions as ActionTypes} from './DocConstants'
import * as Reducers from './DocReducers'
import * as ActionFunctions from './DocActionFunctions'
import * as ActionObservables from './DocActionObservables'
import appStateFactory from '../index'


const {registerStore} = appStateFactory

registerStore(
  Channels.docs,
  {ActionTypes, Reducers, ActionFunctions, ActionObservables}
)
