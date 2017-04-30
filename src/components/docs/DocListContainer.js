import React from 'react'

import Container from 'rflux/components/DangerouslySlowContainer'
import AppState from 'rflux/AppState'

import DocList from './DocList'

const DocListContainer = () => (

  <Container
    docList={AppState.docListObservable}
  >
    <DocList/>
  </Container>
)

export default DocListContainer
