/*eslint no-use-before-define: 0*/
// import {withSideEffects} from '../../app/StateWithSideEffects'

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
  mainWindow: 'DocEditor', // DocEditor || DocList,
  currentDocUuid: null
}

export function switchMainWindow(appState, windowInfo) {

  return {...appState, ...{currentDocUuid: null}, ...windowInfo}
}

export function setCurrentDoc(appState, uuid) {

  return {...appState, ...{currentDocUuid: uuid}}
}
