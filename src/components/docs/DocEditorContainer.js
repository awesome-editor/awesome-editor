/*eslint no-extra-parens: 0*/
import React from 'react'

import Container from '../../app/Container'
import AppState from '../../app/AppState'

import DocEditor from './DocEditor'


const DocEditorContainer = props => (

  <Container
    doc={AppState.docMinusTagsObservable(props.uuid)}
    tags={AppState.docTagsObservable(props.uuid)}
    updateDoc={AppState.updateDoc}
    autocompleteTag={AppState.lookupTags}
    createTag={AppState.createTag}
    addTag={AppState.addTagToDoc}>

    <DocEditor/>

  </Container>
)

export default DocEditorContainer
