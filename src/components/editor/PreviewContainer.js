import React from 'react'
import Remarkable from 'remarkable'

import createContainer from '../../app/createContainer'
import AppState from '../../stores/appstate/AppState'
import Preview from './Preview'


const md = new Remarkable()

export default createContainer({
  docTitle: AppState.currentDocObservable.map(doc => doc.title),
  docHtmlContent: AppState.currentDocObservable.map(doc => doc.content).map(content => md.render(content)),
  docTags: AppState.currentDocTagsObservable,
  useDocToolbar: false,
  editDoc: () => undefined,
  deleteDoc: () => undefined,
  addTag: AppState.addTagToDoc
})(Preview)
