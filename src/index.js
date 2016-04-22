import React from 'react'
import ReactDOM from 'react-dom'
import 'flexboxgrid/css/flexboxgrid.css!'

//required by material-ui
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import './css/app.css!'
import './util/kefirBaconJsOnValue'

import AppContainer from './components/app/AppContainer'

class Main extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() { }

  componentWillUnmount() { }

  render() {
    return <AppContainer />
  }
}

ReactDOM.render(
  <Main/>,
  document.getElementById('app')
)
