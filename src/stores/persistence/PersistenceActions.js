import {Channels, ActionTypes} from '../constants/Constants'


export function upsert(doc) {

  return {
    channel: Channels.persistence,
    actionType: ActionTypes.upsert,
    payload: doc
  }
}
