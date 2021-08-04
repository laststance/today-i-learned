import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import './index.css'
import Routes from './systems/Routes'
import SnackBarSystem from './systems/SnackBarSystem'
import ErrorBoundary from './systems/ErrorBoundary'
import type { Author } from '../types'
import { store } from './redux/store'
import { login } from './redux/adminSlice'

if (window.localStorage.getItem('login') === 'true') {
  const author = JSON.parse(
    window.localStorage.getItem('author') as string
  ) as Author

  store.dispatch(login(author))
}

// @TODO fix Provider typing
// @ts-expect-error
ReduxProvider.displayName = 'ReduxProvider'

const App = () => (
  <React.StrictMode>
    <ErrorBoundary>
      <ReduxProvider store={store}>
        <SnackBarSystem />
        <Routes />
      </ReduxProvider>
    </ErrorBoundary>
  </React.StrictMode>
)

const rootElement = document.getElementById('root') as HTMLDivElement
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<App />, rootElement)
} else {
  ReactDOM.render(<App />, rootElement)
}
