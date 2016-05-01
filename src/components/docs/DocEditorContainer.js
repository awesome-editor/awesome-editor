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
      updateDoc={AppState.updateDoc}
      tags={AppState.docTagsObservable(uuid)}
      lookupTag={AppState.lookupTag}
      createTag={AppState.createTag}
      addTagToDoc={tag => AppState.addTagToDoc(uuid, tag)}>

      <DocEditor/>

    </Container>
  )
}

export default DocEditorContainer
