import 'flexboxgrid/css/flexboxgrid.css!'
import './css/app.css!'
import './util/kefirBaconJsOnValue'

import './stores/appstate/AppState'
import './stores/sideeffects/SideEffects'

import React from 'react';
import ReactDOM from 'react-dom';

import AppState from './stores/appstate/AppState'
import Editor from './components/editor/EditorContainer'
import Preview from './components/editor/Preview'

//required by material-ui
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()


class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      widths: {
        sidebar: 3,
        main: 6,
        preview: 3
      },
      curDocUuid: ''
    }
  }

  componentWillMount() {

    this.unsub = []

    // create blank doc
    AppState.createDoc()

    AppState.newDocUuidObservable.take(1).onValue(AppState.setCurrentDoc)

    this.unsub.push(
      AppState.currentDocUuidObservable._onValue(curDocUuid => this.setState({curDocUuid}))
    )


/*    this.unsub.push(
      NoteStore.currentTagObservable.onValue(() =>

          that.setState({
            widths: {
              sidebar: 3,
              main: 6,
              preview: 3
            }
          })
      )
    );

    this.unsub.push(
      NoteStore.currentDocObservable.onValue(() =>

          that.setState({
            widths: {
              sidebar: 2,
              main: 7,
              preview: 3
            }
          })
      )
    );*/
  }

  componentWillUnmount() {

    this.unsub.forEach(unsub => unsub());
  }

  render() {
    return (
      <div className='row foo'>
        <div className='col-sm-9'>
          <Editor uuid={this.state.curDocUuid} />
        </div>
        <div className='col-sm-3'>
          <Preview uuid={this.state.curDocUuid} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Main/>,
  document.getElementById('app')
);

