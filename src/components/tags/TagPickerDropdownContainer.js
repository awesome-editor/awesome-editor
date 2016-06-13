/*eslint no-extra-parens: 0*/
import React from 'react'

import kefirEmitter from 'rflux/utils/kefirEmitter'
import createContainer from 'rflux/components/createSimpleContainer'
import AppState from 'rflux/AppState'

import TagData from '../../stores/tags/TagData'
import TagPickerDropdown from './TagPickerDropdown'


export default createContainer({

  getInitialObservableState() {
    return {
      currentTagName: ''
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
      debounceLookupTagBus.emit(currentTagName)
    }
    const autocompleteTagList = AppState.lookupTagObservable
    // End: tag lookup

    const _hideDropdown = () => this.setState({automcompleteTagList: []})
    const _clearSelection = () => this.setState({currentTagName: '', autocompleteTagListBus: []})

    // Start: add tag
    const addTag = tag => tag.name.trim().length && AppState.addTagToDoc(tag, this.props.docUuid)
    const _addTagToDocObservable = AppState.addTagToDocResultObservable.map(_clearSelection)
    // End: add tag

    const onKeyDown = (evt, currentTagName) => {

      switch (evt.keyCode) {

        case 13 : // ENTER
          return addTag(new TagData({name: currentTagName}))

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

      addTag,
      _addTagToDocObservable,

      onKeyDown
    }
  }
})(TagPickerDropdown)
