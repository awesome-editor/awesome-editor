/*eslint no-extra-parens: 0*/
import React from 'react'

import Container from 'rflux/components/RFluxDangerouslySlowContainer'
import AppState from 'rflux/AppState'

import DocEditor from './DocEditor'


const DocEditorContainer = ({uuid}) => {

  return (

    <Container
      key="DocEditor"
      uuid={uuid}
      doc={AppState.docMinusTagsObservable(uuid)}
      upsertDoc={AppState.upsertDoc}
      tags={AppState.docTagsObservable(uuid)}
      lookupTag={AppState.lookupTag}
      createTag={AppState.createTagResult}
      addTagToDoc={tag => AppState.addTagToDoc(tag, uuid)}>

      <DocEditor/>

    </Container>
  )
}

export default DocEditorContainer
