import React from 'react'

import Container from '../../app/Container'
import AppState from '../../app/AppState'
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
