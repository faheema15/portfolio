'use client'

import { useState, useEffect } from 'react'
import { 
  CodeBracketIcon, 
  CpuChipIcon, 
  CloudIcon, 
  AcademicCapIcon, 
  TrophyIcon, 
  HeartIcon 
} from '@heroicons/react/24/outline'

const About = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('story')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      observer.observe(aboutSection)
    }

    return () => observer.disconnect()
  }, [])

  const tabs = [
    { id: 'story', label: 'My Story', icon: '📖' },
    { id: 'journey', label: 'Journey', icon: '🚀' },
    { id: 'values', label: 'Values', icon: '💡' }
  ]

  const milestones = [
    {
      year: '2021',
      title: 'Started Computer Science',
      description: 'Began my journey in computer science with a passion for problem-solving',
      icon: <AcademicCapIcon className="h-6 w-6" />
    },
    {
      year: '2022',
      title: 'First ML Project',
      description: 'Built my first machine learning model for image classification',
      icon: <CpuChipIcon className="h-6 w-6" />
    },
    {
      year: '2023',
      title: 'Full Stack Developer',
      description: 'Mastered full-stack development with modern frameworks',
      icon: <CodeBracketIcon className="h-6 w-6" />
    },
    {
      year: '2024',
      title: 'AI Specialist',
      description: 'Specialized in AI/ML solutions and cloud deployment',
      icon: <CloudIcon className="h-6 w-6" />
    }
  ]

  const values = [
    {
      title: 'Innovation',
      description: 'Always pushing boundaries to create cutting-edge solutions',
      icon: '🚀'
    },
    {
      title: 'Quality',
      description: 'Commitment to writing clean, maintainable, and efficient code',
      icon: '⭐'
    },
    {
      title: 'Learning',
      description: 'Continuous learning and adapting to new technologies',
      icon: '📚'
    },
    {
      title: 'Impact',
      description: 'Building solutions that make a real difference in the world',
      icon: '🌍'
    }
  ]

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 px-4 py-2 rounded-full text-purple-600 dark:text-purple-400 font-medium mb-4">
            <span>👋</span>
            <span>Get to Know Me</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Me
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Passionate about bridging the gap between AI innovation and production-ready development
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Profile Image and Quick Info */}
          <div className={`lg:col-span-1 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 text-center">
              {/* Avatar */}
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl text-white font-bold shadow-lg">
                SF
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Sabura Faheema
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-6">
                AI + Full Stack Developer
              </p>

              {/* Quick Stats */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Location</span>
                  <span className="font-medium text-gray-900 dark:text-white">India</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Experience</span>
                  <span className="font-medium text-gray-900 dark:text-white">3+ Years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Projects</span>
                  <span className="font-medium text-gray-900 dark:text-white">20+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Focus</span>
                  <span className="font-medium text-gray-900 dark:text-white">AI & Web</span>
                </div>
              </div>

              {/* Contact Button */}
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 mt-6"
              >
                Let's Connect
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className={`lg:col-span-2 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-4 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
              {activeTab === 'story' && (
                <div className="space-y-6 animate-fade-in-up">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    My Story
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    I'm <span className="font-semibold text-blue-600">Sabura Faheema</span>, a Computer Science engineer 
                    passionate about building modern, scalable applications that blend 
                    <span className="font-semibold text-purple-600"> AI intelligence</span> with 
                    <span className="font-semibold text-blue-600"> clean, functional design</span>.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    From training machine learning models to deploying full-stack systems in the cloud, 
                    I thrive on solving real-world challenges with code. My work bridges the gap between 
                    AI innovation and production-ready development.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    I believe that the future of technology lies in the seamless integration of artificial 
                    intelligence with user-centered design. Whether it's building intelligent chatbots, 
                    developing predictive models, or creating scalable web applications, I'm driven by 
                    the desire to create solutions that make a meaningful impact.
                  </p>
                  
                  {/* Key Interests */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="flex items-start gap-4">
                      <CpuChipIcon className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          AI & Machine Learning
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Building intelligent systems that learn and adapt to solve complex problems
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <CodeBracketIcon className="h-8 w-8 text-purple-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Full Stack Development
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Creating end-to-end solutions with modern frameworks and best practices
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'journey' && (
                <div className="space-y-8 animate-fade-in-up">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    My Journey
                  </h3>
                  
                  <div className="relative">
                    {/* Timeline */}
                    <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 to-purple-500"></div>
                    
                    <div className="space-y-8">
                      {milestones.map((milestone, index) => (
                        <div key={milestone.year} className="relative flex items-start gap-6">
                          <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg">
                            {milestone.icon}
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                                {milestone.year}
                              </span>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                              {milestone.title}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                              {milestone.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Current Focus */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 mt-8">
                    <div className="flex items-center gap-3 mb-4">
                      <TrophyIcon className="h-8 w-8 text-yellow-500" />
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                        Current Focus
                      </h4>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      Currently exploring advanced AI techniques including Large Language Models, 
                      computer vision applications, and their integration into scalable web applications. 
                      Also focusing on cloud-native development and DevOps practices.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'values' && (
                <div className="space-y-8 animate-fade-in-up">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Core Values & Principles
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {values.map((value, index) => (
                      <div 
                        key={value.title}
                        className="bg-white dark:bg-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                            {value.icon}
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                              {value.title}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                              {value.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Philosophy */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 mt-8">
                    <div className="flex items-center gap-3 mb-4">
                      <HeartIcon className="h-8 w-8 text-red-500" />
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                        My Philosophy
                      </h4>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                      "Technology should enhance human capabilities, not replace human creativity. 
                      Every line of code I write, every model I train, and every system I build 
                      is designed with the end user in mind, ensuring that complex technologies 
                      remain accessible and beneficial to everyone."
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Work Together?
            </h3>
            <p className="text-xl mb-6 opacity-90">
              Let's discuss how we can bring your ideas to life with cutting-edge technology
            </p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Start a Conversation
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About