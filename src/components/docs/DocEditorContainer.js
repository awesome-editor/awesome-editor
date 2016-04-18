/*eslint no-extra-parens: 0*/
import React from 'react'

import createContainer from '../../app/createContainer'

import '../../util/Utils.js'
import AppState from '../../app/AppState'

import Editor from './DocEditor'


export default createContainer({
  previewMode: false,
  doc: AppState.currentDocMinusTagsObservable,
  updateDoc: AppState.updateDoc,
  tags: AppState.currentDocTagsObservable,
  autocompleteTag: AppState.lookupTags,
  createTag: AppState.createTag,
  addTag: AppState.addTagToDoc
})(Editor)
