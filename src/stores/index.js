import createHistory from 'history/createBrowserHistory'
import {routerReducer, routerMiddleware} from 'react-router-redux'
import appStateFactory from 'rflux'

import {appSagas, appStore} from './app/index'
import {docStore} from './docs/index'
import {storageSagas} from './storage/index'
import {tagStore, tagSagas} from './tags/index'

const history = createHistory()
const middleware = routerMiddleware(history)

const {AppState, AppDispatcher} = appStateFactory({
  stores: [appStore, docStore, tagStore],
  sagas: [appSagas, storageSagas, tagSagas],
  redux: {
    reducers: [routerReducer],
    middleware: [middleware]
  }
})

export {
  AppState,
  AppDispatcher,
  history
}
