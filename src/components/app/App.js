/*eslint no-extra-parens: 0*/
import React from 'react'

import AppBar from 'material-ui/lib/app-bar'
import IconButton from 'material-ui/lib/icon-button'
import NavigateLeft from 'material-ui/lib/svg-icons/navigation/chevron-left'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'

import DocEditorContainer from '../docs/DocEditorContainer'
import DocListContainer from '../docs/DocListContainer'
import DocPreviewContainer from '../docs/DocPreviewContainer'

const App = ({mainWindow, currentDocUuid, systemCreateDoc, systemShowDocList}) => {

  let Main
  let Sidebar = ''
  let title = ''
  let LeftMenu = null
  let ActionButton = null

  switch (mainWindow) {
    case 'DocEditor':
      Main = <DocEditorContainer key="DocEditor" uuid={currentDocUuid}/>
      Sidebar = <DocPreviewContainer key="DocPreview" uuid={currentDocUuid} disableToolbar={true}/>
      title = 'Edit Note'
      LeftMenu = <IconButton onClick={systemShowDocList}><NavigateLeft /></IconButton>
      break

    case 'DocList':
      Main = <DocListContainer />
      Sidebar = currentDocUuid ?
        <DocPreviewContainer key="DocPreview" uuid={currentDocUuid} disableToolbar={false}/> :
        ''
      title = 'Notes'
      ActionButton = (
        <FloatingActionButton onClick={systemCreateDoc} style={{position: 'absolute', bottom: '1em', right: 0}}>
          <ContentAdd />
        </FloatingActionButton>
      )
      break

    default:
      throw new Error(`mainWindow ${mainWindow} not handled`)
  }

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

App.defaultProps = {

  mainWindow: 'DocList',
  currentDocUuid: null,
  switchToEditor: false,
  switchToList: true,
  systemCreateDoc: () => undefined,
  systemShowDocList: () => undefined
}


export default App
