import React from 'react'
import Remarkable from 'remarkable'

import Container from '../../rflux/Container'
import AppState from '../../rflux/AppState'

import DocPreview from './DocPreview'


const md = new Remarkable()

const DocPreviewContainer = props => (

  <Container
    docTitle={AppState.docObservable(props.uuid).map(doc => doc.title)}
    docHtmlContent={AppState.docObservable(props.uuid).map(doc => doc.content).map(content => md.render(content))}
    docTags={AppState.docTagsObservable(props.uuid)}
    disableToolbar={props.disableToolbar}
    editDoc={() => undefined}
    deleteDoc={() => undefined}
    addTag={AppState.addTagToDoc}
    >

    <DocPreview/>

  </Container>
)

export default DocPreviewContainer

