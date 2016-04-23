import React from 'react'

import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import CardTitle from 'material-ui/lib/card/card-title'
import CardActions from 'material-ui/lib/card/card-actions'
import FlatButton from 'material-ui/lib/flat-button'

import TagList from '../tags/TagList'


const DocPreview = ({docTitle, docHtmlContent, docTags, disableToolbar, editDoc, deleteDoc}) => {

  return (
    <Card>

      <CardTitle
        title={docTitle}/>

      <CardText>
        <div dangerouslySetInnerHTML={{__html: docHtmlContent}}></div>
      </CardText>

      <CardText>
        <TagList tags={docTags} previewMode={true}/>
      </CardText>

      {disableToolbar ? '' :
        <CardActions>
          <FlatButton label="Edit" onTouchStart={editDoc}/>
          <FlatButton label="Delete" onTouchStart={deleteDoc}/>
        </CardActions>}

    </Card>
  )
}

DocPreview.defaultProps = {
  disableToolbar: false
}

export default DocPreview
