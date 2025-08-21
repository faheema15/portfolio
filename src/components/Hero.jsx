'use client'

import { useEffect, useState } from 'react'
import { ChevronDownIcon, SparklesIcon, CodeBracketIcon, CpuChipIcon } from '@heroicons/react/24/outline'

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentRole, setCurrentRole] = useState(0)

  const roles = [
    'AI Developer',
    'Full Stack Developer', 
    'ML Engineer',
    'Cloud Architect'
  ]

  useEffect(() => {
    setIsVisible(true)
    
    // Rotate roles every 3 seconds
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Main Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Greeting */}
            <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200 dark:border-blue-800 mb-6">
              <SparklesIcon className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Welcome to my digital space
              </span>
            </div>

            {/* Name */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="block text-gray-900 dark:text-white">
                Sabura
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Faheema
              </span>
            </h1>

            {/* Dynamic Role */}
            <div className="h-20 flex items-center justify-center mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-300">
                <span className="inline-flex items-center gap-3">
                  {currentRole === 0 && <CpuChipIcon className="h-8 w-8 text-blue-600" />}
                  {currentRole === 1 && <CodeBracketIcon className="h-8 w-8 text-purple-600" />}
                  {currentRole === 2 && <SparklesIcon className="h-8 w-8 text-indigo-600" />}
                  {currentRole === 3 && <CpuChipIcon className="h-8 w-8 text-cyan-600" />}
                  <span key={currentRole} className="transition-all duration-500 ease-in-out">
                    {roles[currentRole]}
                  </span>
                </span>
              </h2>
            </div>

            {/* Description */}
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10">
              Building intelligent solutions that bridge the gap between 
              <span className="text-blue-600 font-semibold"> AI innovation</span> and 
              <span className="text-purple-600 font-semibold"> production-ready development</span>. 
              From machine learning models to scalable full-stack applications.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={scrollToProjects}
                className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full 
                         font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 
                         hover:scale-105 flex items-center gap-2"
              >
                View My Projects
                <SparklesIcon className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              </button>
              
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 
                         text-gray-700 dark:text-gray-300 hover:text-blue-600 px-8 py-4 rounded-full 
                         font-semibold text-lg transition-all duration-300 hover:shadow-lg 
                         hover:scale-105 flex items-center gap-2"
              >
                Let's Connect
                <CodeBracketIcon className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto mb-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">AI Model Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">20+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projects Built</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">2+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Discover More</span>
              <ChevronDownIcon 
                className="h-6 w-6 text-gray-400 animate-bounce cursor-pointer hover:text-blue-600 transition-colors duration-300"
                onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero