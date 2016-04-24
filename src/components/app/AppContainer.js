import createContainer from '../../app/createContainer'

import AppState from '../../app/AppState'
import App from './App'


export default createContainer({
  mainWindow: AppState.appMainWindowObservable,
  currentDocUuid: AppState.appCurrentDocUuidObservable,
  switchToEditor: AppState.appMainWindowObservable.diff((prev, cur) => cur === 'DocEditor' && prev !== cur, false),
  switchToList: AppState.appMainWindowObservable.diff((prev, cur) => cur === 'DocList' && prev !== cur, false),
  systemCreateDoc: AppState.systemCreateDoc,
  systemShowDocList: AppState.systemShowDocList
})(App)
