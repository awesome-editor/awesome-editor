/*eslint no-use-before-define: 0*/
//import {addSideEffects} from '../../rflux/StateWithSideEffects'
//import {createDoc} from '../docs/DocActions'
//import {systemShowDocEditor} from './AppActions'

/**
 * You don't need explicit "switch to doc list" or "switch to doc editor" state because you can get that info
 * from the state (compare current w/ previous)
 *
 * So switching to doc editor automagically opens the doc preview.
 * Switching to doc list opens to a blank doc preview
 *
 * @type {{mainWindow: string}}
 */
export const initialState = {
  mainWindow: 'DocList', // DocEditor || DocList,
  currentDocUuid: null
}

export function systemSwitchMainWindow(appState, windowInfo) {

  return {...appState, ...{currentDocUuid: null}, ...windowInfo}
}

export function systemSetCurrentDocUuid(appState, uuid) {

  return {...appState, ...{currentDocUuid: uuid}}
}

export function systemBroadcastNewDocUuid(appState) {

  return {...appState}
}
