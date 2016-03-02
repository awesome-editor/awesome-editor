import uuid from 'uuid'
import TagData from './../stores/tags/TagData'
import {cast} from '../util/Utils'


export default class DocData {

  constructor(args) {

    args = args || {}

    this.uuid = args.uuid || uuid.v4()
    this.title = args.title || ''
    this.subtitle = args.subtitle || ''
    this.content = args.content || ''
    this.tags = (args.tags || []).map(tag => cast(tag, TagData))
  }
}
