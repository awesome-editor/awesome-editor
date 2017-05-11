import appStateFactory from 'rflux'

import {appSagas, appStore} from './app/index'
import {docStore} from './docs/index'
import {storageSagas} from './storage/index'
import {tagStore, tagSagas} from './tags/index'


const {AppState, AppDispatcher} = appStateFactory({
  stores: [appStore, docStore, tagStore],
  sagas: [appSagas, storageSagas, tagSagas]
})

export {
  AppState,
  AppDispatcher
}
