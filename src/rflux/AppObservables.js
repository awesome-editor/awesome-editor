import AppDispatcher from './AppDispatcher'
import {StateWithSideEffects} from './StateWithSideEffects'
import {reducers} from './AppRegistration'


function _scanner(state, action) {

  // reducers take the whole state as input but return only the store state
  // this allows you to #combineSideEffects different reducers
  const appStoreState = reducers.reduce((total, reducer) => {

    const _appStoreState = reducer(state, action)

    return total.combine(_appStoreState)

  }, new StateWithSideEffects)

  return {
    ...appStoreState.state,
    sideEffects: appStoreState.sideEffects
  }
}

/**
 * The net effect is that you wait for everyone to register before firing.
 * Then once you get an action, use the latest registered stores, sideeffects, etc.
 */
export const appStateObservable =
  AppDispatcher
    .scan(_scanner, {})
    .skip(1) //always skip the first one (empty data)

export const appStoreStateObservable = appStateObservable
  .map(state => state)

