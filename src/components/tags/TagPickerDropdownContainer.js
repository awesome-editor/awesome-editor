/*eslint no-extra-parens: 0*/
import React from 'react'
import Kefir from 'kefir'

import kefirEmitter from 'rflux/utils/kefirEmitter'
import createContainer from 'rflux/components/createContainer'

import {AppState} from '../../bootstrap'
import TagData from '../../stores/tags/TagData'
import TagPickerDropdown from './TagPickerDropdown'


export default createContainer({

  getDefaultProps() {
    return {
      /**
       * Parent view needs to define addTag action.
       *
       * @returns {void} void
       */
      addTag: () => undefined,
      addTagResultObservableFunction: () => Kefir.never()
    }
  },

  getInitialObservableState() {
    return {
      currentTagName: '',
      autocompleteTagList: []
    }
  },

  getObservableState() {

    // Start: tag lookup
    const debounceLookupTagBus = kefirEmitter()
    const _debounceLookupTagObservable =
      debounceLookupTagBus
        .debounce(300, {immediate: true})
        .map(AppState.lookupTag)

    const onTagChange = currentTagName => {
      this.setState({currentTagName})
      currentTagName.length > 2 && debounceLookupTagBus.emit(currentTagName)
    }
    const autocompleteTagList = AppState.lookupTagResultObservable
    // End: tag lookup

    const _hideDropdown = () => this.setState({autocompleteTagList: []})
    const _clearSelection = () => this.setState({currentTagName: '', autocompleteTagList: []})

    // Start: add tag
    const addTagProxy = tag => tag.name.trim().length && this.props.addTag(tag)
    const _addTagProxyResultObservable = this.props.addTagResultObservableFunction().map(_clearSelection)
    // End: add tag

    const onKeyDown = (evt, currentTagName) => {

      switch (evt.keyCode) {

        case 13 : // ENTER
          return addTagProxy(new TagData({name: currentTagName}))

        case 27 : // ESC
          return _hideDropdown()

        default:
          break
      }
    }

    return {

      /**
       * This is just normal state (that happens to be a function that sets state and pushes to the bus)
       * @param currentTagName
       */
      onTagChange,
      /**
       * Bus values make their way here.
       *
       * By setting this as state, we get listener lifecycle management for free.
       * We use the "underscore" naming convention because the child shouldn't use it.
       */
      _debounceLookupTagObservable,
      /**
       * This is a special observable state property. It gets its values from the observable.
       * However, you can also set its value as you normally would using #setState.
       */
      autocompleteTagList,

      addTagProxy,
      _addTagProxyResultObservable,

      onKeyDown
    }
  }
})(TagPickerDropdown)
