import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Creative } from '@/components/Creative'
import { Experience } from '@/components/Experience'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Particles } from '@/components/Particles'
import { Projects } from '@/components/Projects'
import { Services } from '@/components/Services'
import { Skills } from '@/components/Skills'

function App() {
  return (
    <>
      <Particles />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Services />
        <Creative />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
