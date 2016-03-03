import React from 'react'
import TagData from '../../stores/tags/TagData'


export default class Tag extends React.Component {

  constructor(props) {

    super(props);
  }

  render() {

    const path = this.props.path

    return (
      <div className="awesome-tag">

        <div className="path">
        {path.reduce((label, cur) => `${label}/${cur.name}`, '') }
        </div>

        <div className="label">/{this.props.name}</div>

      </div>
    );
  }
}

Tag.defaultProps = new TagData()
