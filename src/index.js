import './bootstrap'

import React from 'react'
import ReactDOM from 'react-dom'

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

//import AppDispatcher from './app/AppDispatcher'
//import AppState from './app/AppState'
//
//AppDispatcher.log('dispatcher')
//AppState.appStateObservable.sampledBy(AppDispatcher).log('app state')
