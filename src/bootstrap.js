import 'flexboxgrid/css/flexboxgrid.css!'
import './css/app.css!'

//required by material-ui
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import './util/kefirBaconJsOnValue'
import './stores/app/AppSideEffects'
import './stores/storage/StorageSideEffects'

import './app/AppState'
