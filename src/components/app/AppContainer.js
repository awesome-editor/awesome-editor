import createContainer from 'rflux/components/createSimpleContainer'
import AppState from 'rflux/AppState'

import App from './App'


export default createContainer({
  getInitialObservableState() {
    return {
      mainWindow: AppState.appMainWindowObservable,
      currentDocUuid: AppState.appCurrentDocUuidObservable,
      switchToEditor: AppState.appMainWindowObservable.diff((prev, cur) => cur === 'DocEditor' && prev !== cur, false),
      switchToList: AppState.appMainWindowObservable.diff((prev, cur) => cur === 'DocList' && prev !== cur, false),
      systemCreateDoc: AppState.systemCreateDoc,
      systemSwitchMainWindow: AppState.systemSwitchMainWindow
    }
  }
})(App)
