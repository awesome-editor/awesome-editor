/*eslint no-extra-parens: 0*/
import React from 'react'

import createContainer from '../../app/createContainer'

import DocData from '../../stores/docs/DocData'
import '../../util/Utils.js'
import AppState from '../../stores/appstate/AppState'

import Editor from './Editor'


export default createContainer(
  [
    {observable: AppState.currentDocMinusTagsObservable, property: 'doc'},
    {observable: AppState.currentDocTagsObservable, property: 'tags'}
  ],
  {
    previewMode: false,
    updateDoc: AppState.updateDoc
  },
  {
    getInitialState() {

      return Object.assign(new DocData())
    },

    getDefaultProps() {
      return {
        /**
         * doc uuid
         */
        uuid: '',
        /**
         * Preview mode
         */
        previewMode: false
      }
    }
  }
)(Editor)
