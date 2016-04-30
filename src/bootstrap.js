import 'flexboxgrid/css/flexboxgrid.css!'
import './css/app.css!'
import 'highlight.js/styles/agate.css!'

//required by material-ui
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import './util/kefirBaconJsOnValue'

import './stores/app/AppStore'
import './stores/docs/DocStore'
import './stores/storage/StorageSideEffects'

// make sure to load this last
import './rflux/bootApp'

import AppDispatcher from './rflux/AppDispatcher'
import {storageLoadDocs} from './stores/storage/StorageActions'


// this needs to go in bootstrap.js
AppDispatcher.emit(storageLoadDocs())
