/*eslint no-extra-parens: 0*/
import React from 'react'

import DocEditorContainer from '../docs/DocEditorContainer'
import DocListContainer from '../docs/DocListContainer'
import DocPreviewContainer from '../docs/DocPreviewContainer'


const App = ({mainWindow, currentDocUuid}) => {

  const showDocEditor = mainWindow === 'DocEditor'
  const showDocPreview = currentDocUuid
  const disableDocPreviewToolbar = showDocEditor

  return (
    <div className='row'>
      <div className='col-sm-9'>
        {
          showDocEditor ?
            <DocEditorContainer uuid={currentDocUuid}/> :
            <DocListContainer />
        }
      </div>
      <div className='col-sm-3'>
        {
          showDocPreview ?
            <DocPreviewContainer uuid={currentDocUuid} disableToolbar={disableDocPreviewToolbar} /> :
            ''
        }
      </div>
    </div>
  )
}

App.defaultProps = {

  mainWindow: 'DocList',
  currentDocUuid: null
}


export default App
