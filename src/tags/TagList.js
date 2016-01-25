/*eslint no-extra-parens: 0*/
import React from 'react'
import Bacon from 'baconjs'

//import Card from 'material-ui/lib/card/card'
//import CardActions from 'material-ui/lib/card/card-actions'
//import CardText from 'material-ui/lib/card/card-text'
//import CardTitle from 'material-ui/lib/card/card-title'
//import FlatButton from 'material-ui/lib/flat-button'

import TextField from 'material-ui/lib/text-field'
//import RaisedButton from 'material-ui/lib/raised-button'

import Menu from 'material-ui/lib/menus/menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
//import MenuDivider from 'material-ui/lib/menus/menu-divider'
//import Paper from 'material-ui/lib/paper'
import IconButton from 'material-ui/lib/icon-button';
import AddCircle from 'material-ui/lib/svg-icons/content/add-circle-outline'

import Tag from './Tag'
import TagData from '../types/TagData'


/**
 * Behavior:
 * - add an existing tag to the list
 * - remove a tag from the list
 * - create a new tag and add it to the list
 */
export default class TagList extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      currentTagName: '',
      autocompleteTagList: []
    };

    this._pickTag = this._pickTag.bind(this)
    this._addTag = this._addTag.bind(this)
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

    return Bacon.noMore
  }

  _pickTag(event, tag) {

    const index = tag.key
    const newTag = this.state.autocompleteTagList[index]

    this.props.addTag(newTag).onValue(this._clearSelection)
  }

  _addTag() {

    this.props.addTag(new TagData({name: this.state.currentTagName}))
  }

  _tagPicker() {

    const that = this;

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
        onItemTouchTap={that._pickTag}>

        {this.state.autocompleteTagList.map((tag, i) => { return <MenuItem key={i} children={<Tag {...tag}/>}/>})}

      </Menu>
    )
  }

  componentWillMount() {

    this.autoCompleteBus = new Bacon.Bus();

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

    const that = this;
    const previewMode = this.props.previewMode

    return (
      <div className='tags' style={{position: 'relative'}}>

        {previewMode ? '' : <div>
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
        </div>}

        <div>
          {this.state.autocompleteTagList.length ? this._tagPicker() : ''}
        </div>

        <ul>
          {this.props.tags.map(tag => {
            return (
              <li key={tag.uuid}>
                <Tag {...tag}/>
              </li>
            );
          })}
        </ul>

      </div>
    );
  }

  componentWillUnmount() {

    this.unsub.forEach(unsub => unsub());
  }
}

TagList.defaultProps = {

  previewMode: false,

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
  addTag: () => {onValue: () => {}},

  /**
   * Current tags
   */
  tags: []
};
