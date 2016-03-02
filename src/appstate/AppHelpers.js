/**
 * Bind the action observables to the app state observable (where all the state is).
 * Action observables can give you a fine grain view of a store's state.
 *
 * @param storeName
 * @param appStateObservable
 * @param actionObservables
 * @returns {*}
 * @private
 */
function _bindActionObservables(opts) {

  const {storeName, appStateObservable, actionObservables} = opts

  const mainStoreObservable = appStateObservable.map(app => app[storeName])

  return Object.keys(actionObservables).reduce((total, observable) => {

    return Object.assign(total, {
      [observable]: actionObservables[observable](mainStoreObservable)
    })
  }, {[`${storeName}Observable`]: mainStoreObservable})
}

/**
 * Store actions are now pure functions.
 * We therefore bind these to the app dispatcher.
 *
 * @param appDispatcher
 * @param actions
 * @returns {Array}
 */
function _bindActions(opts) {

  const {appDispatcher, actions} = opts

  return Object.keys(actions).reduce((total, action) => {

    return Object.assign(total, {
      [observable]: (...args) => {

        const actionFn = actions[action]
        const actionPayload = actionFn(...args)

        appDispatcher.emit(actionPayload)
      }
    })
  }, {})
}

export function createStore(opts) {

  const {storeName, appDispatcher, appStateObservable, actions, actionObservables = {}} = opts

  return {
    [storeName]: {
      actions: _bindActions(opts),
      actionObservables: _bindActionObservables(opts)
    }
  }
}
