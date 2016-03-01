import AppDispatcher from './AppDispatcher'
import DocStore from '../stores/DocStore'
import Storage from '../stores/Storage'


function _scanner(state, action) {

  return {
    docs: DocStore.reducers.docs(state.docs, action)
  }
}

/**
 * Observables are functions that return observables from the store observable.
 * "binds" these functions i.e., returns the observables.
 * Also, creates a special observable with the same name as the store.
 * For example,
 * - docsObservable,
 * - newIdObservable,
 * - docObservable (which takes a doc id as input)
 *
 * @param appStateObservable
 * @param storeName
 * @param observables
 * @returns {*}
 * @private
 */
function _bindObservables(appStateObservable, storeName, observables) {

  const mainStoreObservable = appStateObservable.map(app => app[storeName])

  return Object.keys(observables).reduce((total, observable) => {

    return Object.assign(total, {
      [observable]: observables[observable](mainStoreObservable)
    })
  }, {[`${storeName}Observable`]: mainStoreObservable})
}

const appStateObservable = AppDispatcher.scan(_scanner, {docs: {}})
const docsObservables = _bindObservables(appStateObservable, 'docs', DocStore.observables)

export default {
  appStateObservable,
  docs: docsObservables
}
