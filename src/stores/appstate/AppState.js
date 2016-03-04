import AppDispatcher from './../../app/AppDispatcher'
import {createStore} from './../../app/AppHelpers'

import {docs} from '../docs/DocReducers'
import * as DocActionObservables from '../docs/DocActionObservables'
import * as DocActions from '../docs/DocActions'


const initialState = {
  docs: {},
  persistence: {},
  sideEffects: []
}

function _scanner(state, action) {

  const docsResult = docs(state.docs, action)

  const sideEffects = docsResult.sideEffects

  return {
    docs: docsResult.state,
    sideEffects
  }
}

const appStateObservable = AppDispatcher.scan(_scanner, initialState).onValue(state => {

  state.sideEffects.forEach(sideEffect => AppDispatcher.emit(sideEffect))
})


/**
 * This is the "public" interface for app state i.e., what React interfaces with.
 */
export default {

  appStateObservable,

  ...createStore({
    storeName: 'docs',
    appDispatcher: AppDispatcher,
    appStateObservable,
    actionObservables: DocActionObservables,
    actions: DocActions
  })
}
