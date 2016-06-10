import Remarkable from 'remarkable'
import hljs from 'highlight.js'


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

export default md

