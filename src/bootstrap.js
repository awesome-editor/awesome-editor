import 'flexboxgrid/css/flexboxgrid.css!'
import './css/app.css!'
import 'highlight.js/styles/agate.css!'

//required by material-ui
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import './util/kefirBaconJsOnValue'

import './stores/app/AppStore'
import './stores/docs/DocStore'
import './stores/storage/StorageStore'

// make sure to load this last
import './rflux/bootApp'
import AppState from './rflux/AppState'


AppState.storageLoadDocs()
