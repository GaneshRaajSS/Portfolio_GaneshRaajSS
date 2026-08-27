import React, { useEffect } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Intro from './Components/Intro/Intro'
import Skills from './Components/Skills/Skills'
import Experience from './Components/Experience/Experience'
import Projects from './Components/Projects/Projects'
import Contact from './Components/Contact/Contact'

const App = () => {
  useEffect(() => {
    window.history.replaceState(null, '', window.location.pathname)
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="App">
      <Navbar />
      <section id="about">
        <Intro />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </div>
  )
}

export default App

