import React from 'react'
import { useTranslation } from 'react-i18next'

function Toolbar() {
  const { t } = useTranslation()

  return (
    <aside className="toolbar">
      <button title={t('toolbar.pen')}>✏️</button>
      <button title={t('toolbar.eraser')}>🧹</button>
      <button title={t('toolbar.clear')}>🗑️</button>
      <input type="color" title={t('toolbar.color')} defaultValue="#000000" />
      <input type="range" title={t('toolbar.size')} min="1" max="20" defaultValue="5" />
    </aside>
  )
}

export default Toolbar
