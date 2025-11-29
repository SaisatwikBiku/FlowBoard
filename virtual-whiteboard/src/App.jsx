import React from 'react'
import { useTranslation } from 'react-i18next'
import Toolbar from './components/Toolbar.jsx'
import Whiteboard from './components/Whiteboard.jsx'

function App() {
  const { t } = useTranslation()

  return (
    <div className="app">
      <header className="app-header">
        <h1>{t('appTitle')}</h1>
      </header>
      <main className="app-main">
        <Toolbar />
        <Whiteboard />
      </main>
    </div>
  )
}

export default App
