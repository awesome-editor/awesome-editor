import React from 'react'

import {Container} from 'rflux'

import {AppState} from '../../stores/index'

import DocList from './DocList'

const DocListContainer = () => (

  <Container
    docList={AppState.docListObservable}
  >
    <DocList/>
  </Container>
)

export default DocListContainer
