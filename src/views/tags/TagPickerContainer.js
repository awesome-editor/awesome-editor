/*eslint no-extra-parens: 0*/
import React from 'react'
import Kefir from 'kefir'

import TextField from 'material-ui/lib/text-field'
import Paper from 'material-ui/lib/paper';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item'
import IconButton from 'material-ui/lib/icon-button';
import AddCircle from 'material-ui/lib/svg-icons/content/add-circle-outline'

import Tag from './Tag'
import TagData from '../../stores/tags/TagData'

import kefirEmitter from '../../util/kefirEmitter'


const NewTagInput = ({currentTagName, addTag, onChange, onKeyDown, hideDropdown}) => {

  const currentTagNameIsEmpty = currentTagName.trim().length === 0

  return (
    <div>
      <TextField
        hintText='Add tag'
        value={currentTagName}
        onChange={evt => onChange(evt.target.value)}
        onKeyDown={evt => onKeyDown(evt, currentTagName)}
        onBlur={hideDropdown}
      />
      <IconButton
        disabled={currentTagNameIsEmpty}
        tooltip='Add tag'
        touch={true}
        onTouchTap={() => addTag(new TagData({name: currentTagName}))}>
        <AddCircle/>
      </IconButton>
    </div>
  )
}

const tagPickerStyle = {
  marginRight: 32,
  marginBottom: 32,
  float: 'left',
  position: 'relative',
  zIndex: 0
};

const TagPicker = ({autocompleteTagList, onTagItemTouchTap}) => (

  <Paper
    style={tagPickerStyle}
    autoWidth={false}
    zDepth={1}>

    {autocompleteTagList.map((tag, i) => (
      <MenuItem
        key={i}
        onTouchTap={() => onTagItemTouchTap(tag)}
        children={<Tag {...tag}/>}
      />
    ))}

  </Paper>
)

const Dropdown = props => (

  <div>
    <NewTagInput {...props} />
    {props.autocompleteTagList.length ? <div><TagPicker {...props} /></div> : ''}
  </div>
)


/**
 * Behavior:
 * - add an existing tag to the list
 * - remove a tag from the list
 * - create a new tag and add it to the list
 */
export default class TagPickerContainer extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      currentTagName: '',
      autocompleteTagList: []
    };

    this._onChange = this._onChange.bind(this)
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

    return (
      <Dropdown
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

    this.unsub.forEach(unsub => unsub());
  }
}

TagPickerContainer.defaultProps = {

  /**
   * Look up potential tag matches
   *
   * @returns {stream} with tag matches
   */
  autocompleteTag: () => Kefir.constant([]),

  addTag: () => kefirEmitter(),

  createTag: () => kefirEmitter()
};
