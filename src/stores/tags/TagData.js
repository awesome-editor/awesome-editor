import {cast} from '../../util/Utils'


export class Label {

  constructor(args) {

    args = args || {}

    this.uuid = args.uuid
    this.name = args.name
  }
}

/**
 * A "tag" is a
 *
 * - uuid
 * - name
 * - path---an ordered collection of labels (a "tag" minus the path)

 * - Each document has one tag list
 * - Tags can be associated with multiple documents
 *
 */
export default class TagData {

  constructor(args) {

    args = args || {}

    this.uuid = args.uuid || ''
    this.name = args.name || ''
    this.path = (args.path || []).map(label => cast(label, Label))
  }
}
