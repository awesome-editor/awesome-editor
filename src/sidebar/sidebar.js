import React from 'react';
import {Row, Col} from 'react-bootstrap';
import {NoteStore} from '../docs/DocReducers';
import _ from 'lodash';


export class Sidebar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tag: null,
      childTags: []
    }
  }

  componentWillMount() {

    var that = this;

    this.unsub = [];

    this.unsub.push(
      NoteStore.currentTagObservable.onValue(data =>

        that.setState({
          tag: data.tag,
          childTags: data.childTags,
          childDocs: data.childDocs
        })
      )
    );

    NoteStore.fetchChildDocsAndTags();
  }

  componentWillUnmount() {

    this.unsub.forEach(unsub => unsub());
  }

  render() {
    var that = this;

     return (
       <Row>
         <Col md={6}>
           <ul>
             {that.state.childTags.map(tag => {

               return (
                 <li key={tag.name} onClick={_.curry(NoteStore.fetchChildDocsAndTags, tag.uuid)}>
                   {tag.name}
                 </li>
               );
             })}
           </ul>
         </Col>
         <Col md={6}>
           <ul>
             {that.state.childDocs.map(doc => {

               return (
                 <li key={doc.title} onClick={_.curry(NoteStore.fetchDoc, doc.uuid)}>
                   {doc.title}
                 </li>
               );
             })}
           </ul>
         </Col>
       </Row>
     );
  }
}
