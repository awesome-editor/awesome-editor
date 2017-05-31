/*eslint no-extra-parens: 0*/
import React from 'react'

import {Container} from 'rflux'

import {AppState} from '../../stores/index'

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
      upsertDoc={AppState.actions.upsertDoc}

      tags={AppState.docTagsObservable(uuid)}
      addTag={tag => AppState.actions.addTagToDoc(tag, uuid)}
      addTagResultObservableFunction={() => AppState.addTagToDocResultObservable}>

      <DocEditor/>

    </Container>
  )
}

export default DocEditorContainer
