'use client'

import Header from '../components/Header'
import Hero from '../components/Hero'
import Skills from '../components/Skills'
import ProjectsList from '../components/ProjectsList'
import About from '../components/About'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import AIChatbotDemo from '../components/AIChatbotDemo'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <Header />
      <Hero />
      <Skills />
      <ProjectsList />
      <About />
      <Contact />
      <Footer />
      <AIChatbotDemo />
    </main>
  )
}

// publications, experience soon