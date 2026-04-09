// src/App.tsx
import { Provider } from 'react-redux'
import { store } from './redux/store'
import AppRouter from './routes'
import './i18n'

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}

export default App