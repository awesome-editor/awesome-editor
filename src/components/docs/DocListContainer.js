import React from 'react'

import Container from 'rflux/Container'
import AppState from 'rflux/AppState'
import DocList from './DocList'

const DocListContainer = () => (

  <Container
    docList={AppState.docListObservable}
    onDocListIemSelect={AppState.systemShowDocEditor}
  >
    <DocList/>
  </Container>
)

export default DocListContainer
