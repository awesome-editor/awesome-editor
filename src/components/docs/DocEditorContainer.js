/*eslint no-extra-parens: 0*/
import React from 'react'

import Container from '../../app/Container'
import AppState from '../../app/AppState'

import DocEditor from './DocEditor'


const DocEditorContainer = ({uuid}) => {

  return (

    <Container
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
