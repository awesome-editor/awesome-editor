import React from 'react'

import Container from 'rflux/components/DangerouslySlowContainer'
import AppState from 'rflux/AppState'

import DocPreview from './DocPreview'

import md from './markdown'


const DocPreviewContainer = ({uuid, disableToolbar}) => {

  return (
    <Container
      docTitle={AppState.docMinusTagsObservable(uuid).map(doc => doc.title)}
      docHtmlContent={AppState.docMinusTagsObservable(uuid).map(doc => doc.content).map(content => md.render(content))}
      tags={AppState.docTagsObservable(uuid)}
      disableToolbar={disableToolbar}
      editDoc={() => undefined}
      deleteDoc={() => undefined}
    >

      <DocPreview/>

    </Container>
  )
}

export default DocPreviewContainer

