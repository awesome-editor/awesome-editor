/*eslint no-extra-parens: 0*/
import React from 'react'
import Kefir from 'kefir'

import TextField from 'material-ui/lib/text-field'
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item'
import IconButton from 'material-ui/lib/icon-button';
import AddCircle from 'material-ui/lib/svg-icons/content/add-circle-outline'

import Tag from './Tag'
import TagData from '../types/TagData'

import kefirEmitter from '../util/kefirEmitter'


/**
 * Behavior:
 * - add an existing tag to the list
 * - remove a tag from the list
 * - create a new tag and add it to the list
 */
export default class TagPicker extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      currentTagName: '',
      autocompleteTagList: []
    };

    this._onTagItemTouchTap = this._onTagItemTouchTap.bind(this)
    this._onKeyDown = this._onKeyDown.bind(this)
    this._addTag = this._addTag.bind(this)
    this._clearSelection = this._clearSelection.bind(this)
    this._hideDropdown = this._hideDropdown.bind(this)
  }


  _onChange(currentTagName) {

    this.setState({currentTagName})

    if (currentTagName.length > 2) {

      this.autoCompleteEmitter.emit(currentTagName);
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
    }
  }

  _onTagItemTouchTap(event, tag) {

    const index = tag.key
    const newTag = this.state.autocompleteTagList[index]

    this._addTag(newTag)
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


  _newTagInput() {

    const currentTagNameIsEmpty = this.state.currentTagName.trim().length === 0

    return (
      <div>
        <TextField
          ref={ref => this._tagInput = ref}
          hintText='Add tag'
          value={this.state.currentTagName}
          onChange={evt => this._onChange(evt.target.value)}
          onKeyDown={evt => this._onKeyDown(evt, this.state.currentTagName)}
          onBlur={() => this._tagInput.focus()}
        />
        <IconButton
          disabled={currentTagNameIsEmpty}
          tooltip='Add tag'
          touch={true}
          onTouchTap={() => this._addTag(new TagData({name: this.state.currentTagName}))}>
          <AddCircle/>
        </IconButton>
      </div>
    )
  }

  _tagPicker() {

    const style = {
      marginRight: 32,
      marginBottom: 32,
      float: 'left',
      position: 'relative',
      zIndex: 0
    };

    return (
      <Menu
        style={style}
        autoWidth={false}
        onItemTouchTap={this._onTagItemTouchTap}>

        {this.state.autocompleteTagList.map((tag, i) => { return <MenuItem key={i} children={<Tag {...tag}/>}/>})}

      </Menu>
    )
  }

  _dropDown() {

    return (
      <div>

        {this._newTagInput()}

        {this.state.autocompleteTagList.length ? <div>{this._tagPicker()}</div> : ''}

      </div>
    );
  }

  componentWillMount() {

    this.autoCompleteEmitter = kefirEmitter()

    this.unsub = [];

    this.unsub.push(
      this.autoCompleteEmitter
        .debounce(300, {immediate: true})
        .flatMap(name => this.props.autocompleteTag(name))
        .filter(tags => tags)
        ._onValue(autocompleteTagList => this.setState({autocompleteTagList}))
    );
  }

  render() {

    return this._dropDown()
  }

  componentWillUnmount() {

    this.unsub.forEach(unsub => unsub());
  }
}

TagPicker.defaultProps = {

  /**
   * Look up potential tag matches
   *
   * @returns {stream} with tag matches
   */
  autocompleteTag: () => Kefir.constant([]),

  addTag: () => kefirEmitter(),

  createTag: () => kefirEmitter()
};
