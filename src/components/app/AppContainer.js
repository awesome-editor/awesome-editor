import createContainer from 'rflux/components/createContainer'
import AppState from 'rflux/AppState'

import App from './App'


export default createContainer({
  getInitialState() {
    return {
      mainWindow: 'DocList',
      currentDocUuid: null,
      switchToEditor: false,
      switchToList: true,
      systemCreateDoc: AppState.systemCreateDoc,
      systemSwitchMainWindow: AppState.systemSwitchMainWindow
    }
  },
  getObservableState() {
    return {
      mainWindow: AppState.appMainWindowObservable,
      currentDocUuid: AppState.appCurrentDocUuidObservable,
      switchToEditor: AppState.appMainWindowObservable.diff((prev, cur) => cur === 'DocEditor' && prev !== cur, false),
      switchToList: AppState.appMainWindowObservable.diff((prev, cur) => cur === 'DocList' && prev !== cur, false)
    }
  }
})(App)
