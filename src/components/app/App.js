/*eslint no-extra-parens: 0*/
import React from 'react'

import DocEditorContainer from '../docs/DocEditorContainer'
import DocListContainer from '../docs/DocListContainer'
import DocPreviewContainer from '../docs/DocPreviewContainer'


const App = ({mainWindow, currentDocUuid}) => {

  let Main
  let Sidebar = ''

  switch (mainWindow) {
    case 'DocEditor':
      Main = <DocEditorContainer key="DocEditor" uuid={currentDocUuid}/>
      Sidebar = <DocPreviewContainer key="DocPreview" uuid={currentDocUuid} disableToolbar={true}/>
      break

    case 'DocList':
      Main = <DocListContainer />
      Sidebar = currentDocUuid ?
        <DocPreviewContainer uuid={currentDocUuid} disableToolbar={false}/> :
        ''
      break

    default:
      throw new Error(`mainWindow ${mainWindow} not handled`)
  }

  return (
    <div className='row'>
      <div className='col-sm-9'>
        {Main}
      </div>
      <div className='col-sm-3'>
        {Sidebar}
      </div>
    </div>
  )
}

App.defaultProps = {

  mainWindow: 'DocList',
  currentDocUuid: null,
  switchToEditor: false,
  switchToList: true
}


export default App
