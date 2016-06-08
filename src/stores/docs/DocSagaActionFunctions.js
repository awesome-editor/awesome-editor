import {Channels} from '../constants/Constants'
import {DocSagas} from './DocConstants'

export function addTagToDoc(tag, docUuid) {

  return {
    channel: Channels.docSagas,
    actionType: DocSagas.addTagToDoc,
    payload: {tag, docUuid}
  }
}
