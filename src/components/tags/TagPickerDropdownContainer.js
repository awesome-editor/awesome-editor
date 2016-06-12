/*eslint no-extra-parens: 0*/
import React from 'react'

import kefirEmitter from 'rflux/utils/kefirEmitter'
import RFluxContainer from 'rflux/components/RFluxContainer'
import AppState from 'rflux/AppState'

import TagData from '../../stores/tags/TagData'
import TagPickerDropdown from './TagPickerDropdown'


export default class TagPickerDropdownContainer extends RFluxContainer {

  constructor(props) {
    super(props)
  }

  getInitialObservableState() {

    const debounceLookupTagBus = kefirEmitter()
    const debounceLookupTagObservable = debounceLookupTagBus.debounce(300, {immediate: true})

    return {
      /**
       * This is just normal state.
       */
      currentTagName: '',

      /**
       * This is just normal state (that happens to be a function that sets state and pushes to the bus)
       * @param currentTagName
       */
      onTagChange: currentTagName => { this.setState({currentTagName}); debounceLookupTagBus.emit(currentTagName) },
      /**
       * Bus values make their way here.
       *
       * By setting this as state, we get listener lifecycle management for free.
       * We use the "underscore" naming convention because the child shouldn't use it.
       */
      _debounceLookupTagObserver: debounceLookupTagObservable.map(AppState.lookupTag),
      /**
       * This is a special observable state property. It gets its values from the observable.
       * However, you can also set its value as you normally would using #setState.
       */
      autocompleteTagList: AppState.lookupTagObservable,

      onKeyDown: this._onKeyDown,

      addTag: tag => tag.name.trim().length && AppState.addTagToDoc(tag, this.props.docUuid),
      _addTagToDocObserver: AppState.addTagToDocObservable.map(() => this._clearSelection())
    }
  }

  _onKeyDown(evt, currentTagName) {

    switch (evt.keyCode) {

      case 13 : // ENTER
        return this.state.addTag(new TagData({name: currentTagName}))

      case 27 : // ESC
        return this._hideDropdown()

      default:
        break
    }
  }

  _hideDropdow() { this.setState({automcompleteTagList: []}) }

  _clearSelection() { this.setState({currentTagName: '', autocompleteTagListBus: []}) }

  /**
   * Automatically map observable state to properties
   * @returns {TagPickerDropdown}
   */
  renderComponent() {

    return TagPickerDropdown
  }
}
