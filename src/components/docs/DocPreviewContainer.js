import React from 'react'
import Remarkable from 'remarkable'
import hljs from 'highlight.js'

import Container from 'rflux/Container'
import AppState from 'rflux/AppState'

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

const DocPreviewContainer = ({uuid, disableToolbar}) => {

  return (
    <Container
      docTitle={AppState.docMinusTagsObservable(uuid).map(doc => doc.title)}
      docHtmlContent={AppState.docMinusTagsObservable(uuid).map(doc => doc.content).map(content => md.render(content))}
      tags={AppState.docTagsObservable(uuid)}
      disableToolbar={disableToolbar}
      editDoc={() => undefined}
      deleteDoc={() => undefined}
    >

      <DocPreview/>

    </Container>
  )
}

export default DocPreviewContainer

