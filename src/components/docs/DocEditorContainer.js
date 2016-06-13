/*eslint no-extra-parens: 0*/
import React from 'react'

import Container from 'rflux/components/RFluxDangerouslySlowContainer'
import AppState from 'rflux/AppState'

import DocEditor from './DocEditor'


const DocEditorContainer = ({uuid}) => {

  return (

    <Container
      key="DocEditor"
      doc={AppState.docMinusTagsObservable(uuid)}
      upsertDoc={AppState.upsertDoc}
      tags={AppState.docTagsObservable(uuid)}
      uuid={uuid}>

      <DocEditor/>

    </Container>
  )
}

export default DocEditorContainer
