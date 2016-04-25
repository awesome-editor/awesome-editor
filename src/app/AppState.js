import AppDispatcher from './AppDispatcher'
import {StateWithSideEffects} from './StateWithSideEffects'
import Reducers from './Reducers'

import createStore from './createStore'
//import {combineSideEffects} from '../../app/StateWithSideEffects'

import {storageLoadDocs} from '../stores/storage/StorageActions'

const appStateObservable = AppDispatcher
  .scan(_scanner, {})
  .skip(1) //always skip the first one (empty data)

import * as DocActions from '../stores/docs/DocActions'
import * as DocActionObservables from '../stores/docs/DocActionObservables'


const docStore = createStore(
  'docs',
  {actionFuncs: DocActions, actionObservables: DocActionObservables},
  {AppDispatcher, appStateObservable}
)

import * as AppActions from '../stores/app/AppActions'
import * as AppActionObservables from '../stores/app/AppActionObservables'

const appStore = createStore(
  'app',
  {actionFuncs: AppActions, actionObservables: AppActionObservables},
  {AppDispatcher, appStateObservable}
)

function _scanner(state, action) {

  // reducers take the whole state as input but return only the store state
  // this allows you to #combineSideEffects different reducers
  const newState = Reducers.reducers.reduce((newState, reducer) => {

    const storeState = reducer(state, action)

    return newState.combine(storeState)

  }, new StateWithSideEffects())

  return {
    ...newState.state,
    sideEffects: newState.sideEffects
  }
}

// setup one-way data flow
appStateObservable.onValue(appState => {

  //remit all side effects
  setTimeout(() => appState.sideEffects.forEach(AppDispatcher.emit), 0)
})

AppDispatcher.emit(storageLoadDocs())

/**
 * This is the "public" interface for app state i.e., what React interfaces with.
 */
export default {
  appStateObservable,
  ...docStore,
  ...appStore
}
