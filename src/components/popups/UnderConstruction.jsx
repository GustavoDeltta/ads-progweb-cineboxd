import React from 'react'
import './UnderConstruction.css'

export default function UnderConstruction({ onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>🚧 Em construção 🚧</h2>
        <p>Essa funcionalidade ainda está sendo desenvolvida.</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  )
}
