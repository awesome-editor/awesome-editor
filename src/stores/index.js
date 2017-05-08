import appStateFactory from 'rflux'
import {sagaFactory} from 'rflux'

import {appSagas, appStore} from './app/AppStore'
import {docStore} from './docs/DocStore'
import {storageSagas} from './storage/StorageStore'
import {tagStore, tagSagas} from './tags/TagStore'


const {AppState, AppDispatcher} = appStateFactory({
  stores: [appStore, docStore, tagStore],
  sagas: [appSagas, storageSagas, tagSagas]
})
const sagas = sagaFactory(AppDispatcher)

export {
  AppState,
  AppDispatcher,
  sagas,
}
