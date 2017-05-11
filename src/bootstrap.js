import 'flexboxgrid/css/flexboxgrid.css!'
import './css/app.css!'
import 'highlight.js/styles/agate.css!'
// required by material-ui
import injectTapEventPlugin from 'react-tap-event-plugin'
// deprecated?
import './util/kefirBaconJsOnValue'

// make sure to load this last
import {AppState} from './stores/index'


injectTapEventPlugin()

// TODO this should probably be abstracted away
AppState.storageLoadDocs()
AppState.storageLoadTags()
