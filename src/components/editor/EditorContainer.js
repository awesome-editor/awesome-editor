/*eslint no-extra-parens: 0*/
import React from 'react'

import createContainer from '../../app/createContainer'

import '../../util/Utils.js'
import AppState from '../../stores/appstate/AppState'

import Editor from './Editor'


export default createContainer({
  doc: AppState.currentDocMinusTagsObservable,
  tags: AppState.currentDocTagsObservable,
  previewMode: false,
  updateDoc: AppState.updateDoc
})(Editor)
