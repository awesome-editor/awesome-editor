/*eslint no-extra-parens: 0*/
import React from 'react'

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

    this._pickTag = this._pickTag.bind(this)
    this._addTag = this._addTag.bind(this)
    this._clearSelection = this._clearSelection.bind(this)
  }


  _onChange(currentTagName) {

    this.setState({currentTagName})

    if (currentTagName.length > 2) {

      this.autoCompleteBus.push(currentTagName);
    }
    else {

      this.setState({autocompleteTagList: []})
    }
  }

  _clearSelection() {

    this.setState({currentTagName: '', autocompleteTagList: []})
  }

  _pickTag(event, tag) {

    const index = tag.key
    const newTag = this.state.autocompleteTagList[index]

    // TODO do I need to unsub this listener?
    this.props.addTag(newTag).onValue(this._clearSelection)
  }

  _addTag() {

    this.props.addTag(new TagData({name: this.state.currentTagName}))
  }


  _newTagInput() {

    const that = this

    return (
      <div>
        <TextField
          hintText='Add tag'
          value={this.state.currentTagName}
          onChange={evt => that._onChange(evt.target.value)}
        />
        <IconButton
          disabled={this.state.currentTagName.trim().length === 0}
          tooltip='Add tag'
          touch={true}
          onTouchTap={this._addTag}>
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
      <DropDownMenu
        style={style}
        autoWidth={false}
        onItemTouchTap={this._pickTag}>

        {this.state.autocompleteTagList.map((tag, i) => { return <MenuItem key={i} children={<Tag {...tag}/>}/>})}

      </DropDownMenu>
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

    this.autoCompleteBus = kefirEmitter()

    this.unsub = [];

    this.unsub.push(
      this.autoCompleteBus
        .debounce(300)
        .flatMap(name => this.props.autocompleteTag(name))
        .filter(tags => tags)
        .onValue(autocompleteTagList => this.setState({autocompleteTagList}))
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
  autocompleteTag: () => {},

  /**
   * Called for both creating new tag or adding existing tag
   *
   * @returns {stream} a stream that fires when update finishes
   */
  addTag: () => {onValue: () => {}}
};
