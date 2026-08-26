import React from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Intro from './Components/Intro/Intro'
import Stitle from './Components/Skills/Stitle/Stitle'
import Skills from './Components/Skills/Skills'
import Etitle from './Components/Experience/Etitle/Etitle'
import Experience from './Components/Experience/Experience'
import Ptitle from './Components/Projects/Ptitle/Ptitle'
import Projects from './Components/Projects/Projects'
import Ctitle from './Components/Contact/Ctitle/Ctitle'
import Contact from './Components/Contact/Contact'

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <section id="about">
        <Intro />
      </section>
      <section id="skills">
        <Stitle />
        <Skills />
      </section>
      <section id="experience">
        <Etitle />
        <Experience />
      </section>
      <section id="projects">
        <Ptitle />
        <Projects />
      </section>
      <section id="contact">
        <Ctitle />
        <Contact />
      </section>
    </div>
  )
}

export default App
