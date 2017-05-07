/*eslint no-extra-parens: 0*/
import React from 'react'

import Container from 'rflux/components/DangerouslySlowContainer'

import {AppState} from '../../bootstrap'

import DocEditor from './DocEditor'


/**
 * We pass a function that returns an observable because the Container turns observables into values.
 *
 * @param {String} uuid
 * @returns {XML} container view
 * @constructor
 */
const DocEditorContainer = ({uuid}) => {

  return (

    <Container
      key="DocEditor"

      doc={AppState.docMinusTagsObservable(uuid)}
      upsertDoc={AppState.upsertDoc}

      tags={AppState.docTagsObservable(uuid)}
      addTag={tag => AppState.addTagToDoc(tag, uuid)}
      addTagResultObservableFunction={() => AppState.addTagToDocResultObservable}>

      <DocEditor/>

    </Container>
  )
}

export default DocEditorContainer
