import AppDispatcher from './AppDispatcher'
import {StateWithSideEffects} from './StateWithSideEffects'
import {Channels, ActionTypes} from './Constants'


function _registerReducer(state, action) {

  const reducers = state.reducers.concat([action.payload])

  return {...state, reducers}
}

// reducers take the whole state as input but return only the store state
// this allows you to #combineSideEffects different reducers
function _processAction(state, action) {

  const appStoreState = state.reducers.reduce((total, reducer) => {

    const _appStoreState = reducer(state.appStoreState, action)

    return total.combine(_appStoreState)

  }, new StateWithSideEffects)

  return {
    ...state,
    appStoreState: {...appStoreState.state},
    sideEffects: appStoreState.sideEffects
  }
}

function _scanner(state, action) {

  if (action.channel === Channels.appMeta && action.actionType === ActionTypes.registerReducer) {

    return _registerReducer(state, action)
  }

  return _processAction(state, action)
}

export const appStateObservable = AppDispatcher
  .scan(_scanner, {reducers: [], sideEffects: [], appStoreState: null})
  .skip(1) //always skip the first one (empty data)

export const appStoreStateObservable = appStateObservable
  .map(state => state.appStoreState)
  .filter(appStoreState => appStoreState)

