import React from 'react'
import TagData from '../../stores/tags/TagData'


const Tag = ({path, name}) => (

  <div className="awesome-tag">

    <div className="path">
      {path.reduce((label, cur) => `${label}/${cur.name}`, '') }
    </div>

    <div className="label">/{name}</div>

  </div>
)

Tag.defaultProps = new TagData()

export default Tag
