/*eslint no-extra-parens: 0*/
import React from 'react'
import Kefir from 'kefir'

import kefirEmitter from '../../rflux/support/kefirEmitter'
import {bindToInstance} from '../../util/Utils'

import TagData from '../../stores/tags/TagData'
import TagPickerDropdown from './TagPickerDropdown'

/**
 * Behavior:
 * - add an existing tag to the list
 * - remove a tag from the list
 * - create a new tag and add it to the list
 */
export default class TagPickerContainer extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      currentTagName: '',
      autocompleteTagList: []
    }

    bindToInstance(this, '_onChange', '_onTagItemTouchTap', '_onKeyDown', '_addTag', '_clearSelection', '_hideDropdown')
  }

  _onChange(currentTagName) {

    this.setState({currentTagName})

    if (currentTagName.length > 2) {

      this.autoCompleteEmitter.emit(currentTagName)
    }
    else {

      this.setState({autocompleteTagList: []})
    }
  }

  _onKeyDown(evt, currentTagName) {

    switch (evt.keyCode) {

      case 13 : // ENTER
        return this._addTag(new TagData({name: currentTagName}))

      case 27 : // ESC
        return this._hideDropdown()

      default:
        break
    }
  }

  _onTagItemTouchTap(tag) {

    this._addTag(tag)
  }

  _hideDropdown() {

    this.setState({autocompleteTagList: []})
  }

  _clearSelection() {

    this.setState({currentTagName: '', autocompleteTagList: []})
  }

  _addTag(tag) {

    if (tag.name.trim().length) {

      if (!tag.uuid) {

        return this.props.createTag(tag).log('tag').onValue(this.props.addTag).onValue(this._clearSelection)
      }

      this.props.addTag(tag).onValue(this._clearSelection)
    }
  }

  componentWillMount() {

    this.autoCompleteEmitter = kefirEmitter()

    this.unsub = []

    this.unsub.push(
      this.autoCompleteEmitter
        .debounce(300, {immediate: true})
        // TODO one of the things that we lost is the nice cause-and-effect between doing a tagLookup
        // and getting the results
        ._onValue(name => this.props.autocompleteTag(name))
    )

    this.unsub.push(
      //this.props.systemTagLookupResultsObservable
      //  .filter(tags => tags)
      //  ._onValue(autocompleteTagList => this.setState({autocompleteTagList}))
    )
  }

  render() {

    return (
      <TagPickerDropdown
        currentTagName={this.state.currentTagName}
        autocompleteTagList={this.state.autocompleteTagList}
        onTagItemTouchTap={this._onTagItemTouchTap}
        addTag={this._addTag}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
        hideDropdown={this._hideDropdown}
      />
    )
  }

  componentWillUnmount() {

    this.unsub.forEach(unsub => unsub())
  }
}

TagPickerContainer.defaultProps = {

  /**
   * Look up potential tag matches
   *
   * @returns {stream} with tag matches
   */
  autocompleteTag: () => Kefir.constant([]),
  systemTagLookupResultsObservable: () => Kefir.constant([]),

  addTag: () => undefined,

  createTag: () => undefined
}
