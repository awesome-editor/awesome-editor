import 'flexboxgrid/css/flexboxgrid.css!'
import './css/app.css!'

//required by material-ui
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import './util/kefirBaconJsOnValue'

import './stores/app/AppStore'
import './stores/docs/DocStore'
import './stores/storage/StorageSideEffects'

// make sure to load this last
import './app/AppState'
