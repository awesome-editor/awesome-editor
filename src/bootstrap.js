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
import './stores/tags/TagStore'

// make sure to load this last
import AppState from 'rflux/AppState'


// TODO this should probably be abstracted away
AppState.storageLoadDocs()
AppState.storageLoadTags()
