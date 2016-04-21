import React from 'react'
import Remarkable from 'remarkable'

import Container from '../../app/Container'
import AppState from '../../app/AppState'


const md = new Remarkable()

const DocPreviewContainer = props => (

  <Container
    docTitle={AppState.docObservable(props.uuid)}
    docHtmlContent={AppState.docObservable(props.uuid).map(doc => doc.content).map(content => md.render(content))}
    docTags={AppState.docTagsObservable(props.uuid)}
    disableToolbar={props.disableToolbar}
    editDoc={() => undefined}
    deleteDoc={() => undefined}
    addTag={AppState.addTagToDoc}
    >

    <DocPreviewContainer/>

  </Container>
)

export default DocPreviewContainer

