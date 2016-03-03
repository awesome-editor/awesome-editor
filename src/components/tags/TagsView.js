import React from 'react';
import Card from 'material-ui/lib/card/card';
//import CardActions from 'material-ui/lib/card/card-actions';
//import CardExpandable from 'material-ui/lib/card/card-expandable';
//import CardHeader from 'material-ui/lib/card/card-header';
//import CardMedia from 'material-ui/lib/card/card-media';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';

//Import statement:
import List from 'material-ui/lib/lists/list'
import ListDivider from 'material-ui/lib/lists/list-divider'
import ListItem from 'material-ui/lib/lists/list-item'
//import Folder from 'material-ui/lib/svg-icons/file/folder'
import FolderOpen from 'material-ui/lib/svg-icons/file/folder-open'
import SvgIcon from 'material-ui/lib/svg-icon'

import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';

const SelectableList = SelectableContainerEnhance(List);


class FileIcon extends React.Component {
  render() {
    return (
      <SvgIcon {...this.props}>
        <path stroke="null" d="m16.721188,-0.246914l-11.310415,0c-0.759435,0 -1.377851,0.665238 -1.377851,1.48145l0,21.193933c0,0.817442 0.618416,1.481657 1.377851,1.481657l13.854229,0c0.760101,0 1.377943,-0.664215 1.377943,-1.481657l0,-18.094639l-3.921757,-4.580743zm0.325205,2.21681l1.718956,2.00824l-1.718956,0l0,-2.00824zm2.439329,20.458624c0,0.130491 -0.099379,0.237623 -0.221344,0.237623l-13.853605,0c-0.121772,0 -0.220578,-0.107132 -0.220578,-0.237623l0,-21.193984c0,-0.130799 0.098806,-0.236804 0.220578,-0.236804l10.477773,0l0,3.602675c0,0.343014 0.259929,0.621092 0.579211,0.621092l3.017965,0l0,17.207021zm-12.254085,-16.058987l9.827123,0c0.239393,0 0.433561,0.208724 0.433561,0.466062c0,0.257338 -0.194168,0.466062 -0.433561,0.466062l-9.827123,0c-0.239347,0 -0.433563,-0.208724 -0.433563,-0.466062c0,-0.257287 0.194217,-0.466062 0.433563,-0.466062zm10.260684,3.598004c0,0.257286 -0.194168,0.466063 -0.433561,0.466063l-9.827123,0c-0.239347,0 -0.433563,-0.208725 -0.433563,-0.466063s0.194217,-0.466063 0.433563,-0.466063l9.827123,0c0.239393,0 0.433561,0.208776 0.433561,0.466063zm0,3.029376c0,0.257338 -0.194168,0.466063 -0.433561,0.466063l-9.827123,0c-0.239347,0 -0.433563,-0.208725 -0.433563,-0.466063s0.194217,-0.466062 0.433563,-0.466062l9.827123,0c0.239393,-0.000001 0.433561,0.208722 0.433561,0.466062zm0,3.080969c0,0.257336 -0.194168,0.466061 -0.433561,0.466061l-9.827123,0c-0.239347,0 -0.433563,-0.208725 -0.433563,-0.466061s0.194217,-0.466064 0.433563,-0.466064l9.827123,0c0.239393,0 0.433561,0.208723 0.433561,0.466064z"/>
      </SvgIcon>
    );
  }
}

export default class TagsView extends React.Component {

  constructor(props) {

    super(props);

    this.state = {

      root: 'root',
      path: '/path',
      tags: [
        {uuid: '1', name: 'tag1'},
        {uuid: '2', name: 'tag2'}
      ],
      files: [
        {uuid: '3', name: 'file1'},
        {uuid: '4', name: 'file2'}
      ]
    }
  }

  componentWillMount() {
  }

  componentWillUnmount() {

  }

  onTagClick(evt, index) {

  }

  onFileClick(evt, index) {

  }

  render() {

    return (
      <div>
        <Card>
          <CardTitle title={this.state.root} subtitle={this.state.path}/>
          <CardText>
            <SelectableList
              valueLink={{requestChange: this.onTagClick.bind(this)}}>

              {this.state.tags.map((tag, i) => { return (
                <ListItem
                  key={tag.name+i}
                  value={i}
                  primaryText={tag.name}
                  leftIcon={<FolderOpen/>}>
                </ListItem>
              )})}

            </SelectableList>
          </CardText>

          <ListDivider />

          <CardText>
            <SelectableList
              valueLink={{requestChange: this.onFileClick.bind(this)}}>

              {this.state.files.map((filename, i) => { return (
                <ListItem
                  key={filename.name+i}
                  value={i}
                  primaryText={filename.name}
                  leftIcon={<FileIcon/>}>
                </ListItem>
              )})}

            </SelectableList>
          </CardText>
        </Card>
      </div>
    );
  }
}
