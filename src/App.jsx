import { useState } from 'react'
import './App.css'
import Background from './components/background';
import TypewriterText from './components/writer';
import Sidebar from './components/sidebar';

function App() {

  return (
    <>
      <Background />
      <Sidebar />
      <section id="center">
        <h1>
          <TypewriterText
            segments={[
              { text: 'Hola, soy ' },
              { text: 'Lazaro Toconas', className: 'highlight' },
            ]}
            speed={50}
            loop={true}
            restartDelay={4000}
          />
        </h1>
        <TypewriterText
            segments={[
              { text: 'desarrollador de software', className: 'highlight-alt' },
            ]}
            speed={50}
            loop={true}
            restartDelay={4000}
          />
      </section>
    </>
  )
}

export default App
