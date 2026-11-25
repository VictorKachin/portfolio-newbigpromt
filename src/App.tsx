import { Header } from '@/sections/Header/Header'
import { Hero } from '@/sections/Hero/Hero'
import { BentoSkills } from '@/sections/BentoSkills/BentoSkills'
import { Projects } from '@/sections/Projects/Projects'
import { Experience } from '@/sections/Experience/Experience'
import { Contact } from '@/sections/Contact/Contact'
import { AiAssistant } from '@/components/AiAssistant/AiAssistant'

export const App = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BentoSkills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <AiAssistant />
    </>
  )
}
