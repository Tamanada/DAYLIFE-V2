import React from 'react'
import HomePage from './pages/HomePage.jsx'

export default function App() {
  return (
    <div style={{
      fontFamily: 'Inter, sans-serif',
      textAlign: 'center',
      color: '#4B0082',
      padding: '40px'
    }}>
      <h1>🌕 DAYLIFE</h1>
      <p>Every day counts — welcome home!</p>
      <HomePage />
    </div>
  )
}
