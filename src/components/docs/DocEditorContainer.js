/*eslint no-extra-parens: 0*/
import React from 'react'

import Container from '../../rflux/Container'
import AppState from '../../rflux/AppState'

import DocEditor from './DocEditor'


const DocEditorContainer = ({uuid}) => {

  return (

    <Container
      key="DocEditor"
      uuid={uuid}
      doc={AppState.docMinusTagsObservable(uuid)}
      tags={AppState.docTagsObservable(uuid)}
      updateDoc={AppState.updateDoc}
      autocompleteTag={AppState.lookupTags}
      createTag={AppState.createTag}
      addTag={AppState.addTagToDoc}>

      <DocEditor/>

    </Container>
  )
}

export default DocEditorContainer
