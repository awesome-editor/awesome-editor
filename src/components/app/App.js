/*eslint no-extra-parens: 0*/
import React from 'react'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import AppBar from 'material-ui/lib/app-bar'
import IconButton from 'material-ui/lib/icon-button'
import NavigateLeft from 'material-ui/lib/svg-icons/navigation/chevron-left'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'

import DocEditorContainer from '../docs/DocEditorContainer'
import DocListContainer from '../docs/DocListContainer'
import DocPreviewContainer from '../docs/DocPreviewContainer'


/* eslint-disable no-use-before-define */
const App = ({currentDocUuid, systemCreateDoc}) =>
  <Router>
    <div>
      <Route exact path="/" component={docList({currentDocUuid})}/>
      <Route
        path="/edit/:currentDocUuid"
        component={docEditor({currentDocUuid, systemCreateDoc})}
      />
    </div>
  </Router>

const docEditor = ({match}) => () => {
  const {params: {currentDocUuid}} = match
  const Main = <DocEditorContainer key="DocEditor" uuid={currentDocUuid}/>
  const Sidebar =
    <DocPreviewContainer
      key="DocPreview"
      uuid={currentDocUuid}
      disableToolbar={true}
    />
  const title = 'Edit Note'
  const LeftMenu =
    <Link to="/"><IconButton><NavigateLeft/></IconButton></Link>
  const ActionButton = null

  return (
    <div>
      <div className="row">
        <div className="col-sm-12">
          <AppBar title={title} iconElementLeft={LeftMenu}/>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-9">
          {Main}
          {ActionButton}
        </div>
        <div className="col-sm-3">
          {Sidebar}
        </div>
      </div>
    </div>
  )
}

const docList = ({currentDocUuid, systemCreateDoc}) => () => {
  const title = 'Notes'
  const LeftMenu = null
  const Sidebar = currentDocUuid
    ? <DocPreviewContainer key="DocPreview" uuid={currentDocUuid} disableToolbar={false}/>
    : null
  const ActionButton = (
    <FloatingActionButton onClick={systemCreateDoc} style={{position: 'absolute', bottom: '1em', right: 0}}>
      <ContentAdd />
    </FloatingActionButton>
  )

  return (
    <div>
      <div className="row">
        <div className="col-sm-12">
          <AppBar title={title} iconElementLeft={LeftMenu}/>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-9">
          <DocListContainer />
          {ActionButton}
        </div>
        <div className="col-sm-3">
          {Sidebar}
        </div>
      </div>
    </div>
  )
}

App.defaultProps = {
  currentDocUuid: null,
  switchToEditor: false,
  switchToList: true,
  systemCreateDoc: () => undefined
}


export default App
