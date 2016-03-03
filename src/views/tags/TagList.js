/*eslint no-extra-parens: 0*/
import React from 'react'
import Kefir from 'kefir'

//import Card from 'material-ui/lib/card/card'
//import CardActions from 'material-ui/lib/card/card-actions'
//import CardText from 'material-ui/lib/card/card-text'
//import CardTitle from 'material-ui/lib/card/card-title'
//import FlatButton from 'material-ui/lib/flat-button'

//import RaisedButton from 'material-ui/lib/raised-button'

import Tag from './Tag'
import TagPicker from './TagPicker'


/**
 * Behavior:
 * - add an existing tag to the list
 * - remove a tag from the list
 * - create a new tag and add it to the list
 */
export default class TagList extends React.Component {

  constructor(props) {

    super(props);
  }

  componentWillMount() {

    this.unsub = [];
  }

  render() {

    const previewMode = this.props.previewMode

    return (
      <div className='tags' style={{position: 'relative'}}>

        {previewMode ?
          '' :
          <TagPicker
            autocompleteTag={this.props.autocompleteTag}
            addTag={this.props.addTag}
            createTag={this.props.createTag}
          />}

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
  autocompleteTag: () => Kefir.constant([]),

  addTag: () => kefirEmitter(),

  createTag: () => kefirEmitter(),

  /**
   * Current tags
   */
  tags: []
};
