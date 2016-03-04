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
 * @param opts
 * @returns {Array}
 */
function _bindActions(opts) {

  const {appDispatcher, actions} = opts

  return Object.keys(actions).reduce((total, action) => {

    return Object.assign(total, {
      [action]: (...args) => {

        const actionFn = actions[action]
        const actionPayload = actionFn(...args)

        appDispatcher.emit(actionPayload)
      }
    })
  }, {})
}

/**
 * In order for this to work, action and action observable must be globally unique.
 * This isn't hard to achieve as long as (a) you include the storename in the action/observable,
 * and (b) use the word "observable" in the observables.
 * For example, `createDoc`, `docObservable`, etc.
 *
 * @param opts - storeName, appDispatcher, appStateObservable, actions, actionObservables
 * @returns {{}}
 */
export function createStore(opts) {

  return {
    ..._bindActions(opts),
    ..._bindActionObservables(opts)
  }
}


