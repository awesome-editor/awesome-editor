/**
 * Store actions are pure functions.
 * We therefore bind these to the app dispatcher.
 *
 * @param opts
 * @returns {Array}
 */
export default function bindActionsToAppDispatcher({AppDispatcher, actionFuncs}) {

  return Object.keys(actionFuncs).reduce((total, action) => {

    return Object.assign(total, {
      [action]: (...args) => {

        const actionFn = actionFuncs[action]
        const actionPayload = actionFn(...args)

        AppDispatcher.emit(actionPayload)
      }
    })
  }, {})
}
