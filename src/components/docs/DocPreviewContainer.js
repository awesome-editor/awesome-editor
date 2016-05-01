import React from 'react'
import Remarkable from 'remarkable'
import hljs from 'highlight.js'

import Container from '../../rflux/Container'
import AppState from '../../rflux/AppState'

import DocPreview from './DocPreview'


const md = new Remarkable({
  linkify: true,
  typographer: false,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<div class="hljs">' + hljs.highlight(lang, str).value + '</div>'
      }
      catch (err) {
      }
    }

    try {
      return '<div class="hljs">' + hljs.highlightAuto(str).value + '</div>'
    }
    catch (err) {
    }

    return '' // use external default escaping
  }
})

md.block.ruler.enable([
  'footnote',
  'deflist'
])

const DocPreviewContainer = props => {

  return (
    <Container
      docTitle={AppState.docObservable(props.uuid).map(doc => doc.title)}
      docHtmlContent={AppState.docObservable(props.uuid).map(doc => doc.content).map(content => md.render(content))}
      docTags={AppState.docTagsObservable(props.uuid)}
      disableToolbar={props.disableToolbar}
      editDoc={() => undefined}
      deleteDoc={() => undefined}
    >

      <DocPreview/>

    </Container>
  )
}

export default DocPreviewContainer

