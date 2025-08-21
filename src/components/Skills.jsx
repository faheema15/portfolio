'use client'

import { useState, useEffect, useRef } from 'react'
import { skillsData, certifications } from '../data/skills'

const Skills = () => {
  const [visibleSkills, setVisibleSkills] = useState({})
  const [activeCategory, setActiveCategory] = useState(0)
  const skillsRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const categoryIndex = entry.target.dataset.category
            if (categoryIndex) {
              setVisibleSkills(prev => ({
                ...prev,
                [categoryIndex]: true
              }))
            }
          }
        })
      },
      { threshold: 0.3 }
    )

    const skillElements = document.querySelectorAll('[data-category]')
    skillElements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Auto-rotate categories every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory(prev => (prev + 1) % skillsData.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full text-blue-600 dark:text-blue-400 font-medium mb-4">
            <span>🚀</span>
            <span>Tech Stack & Expertise</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Skills & Technologies
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A comprehensive toolkit spanning AI/ML, full-stack development, and cloud technologies
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {skillsData.map((category, index) => (
            <button
              key={category.category}
              onClick={() => setActiveCategory(index)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === index
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.category}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {skillsData.map((category, categoryIndex) => (
            <div
              key={category.category}
              data-category={categoryIndex}
              className={`bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 
                         rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 
                         ${activeCategory === categoryIndex ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
                         ${visibleSkills[categoryIndex] ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${categoryIndex * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="text-3xl">{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {category.category}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                  </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-1000 ease-out bg-black"
                        style={{
                          width: visibleSkills[categoryIndex] ? `${skill.level}%` : '0%',
                          transitionDelay: `${skillIndex * 100}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Certifications & Achievements
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Continuous learning and professional development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={cert.name}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center hover:shadow-lg 
                          transition-all duration-300 hover:scale-105 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {cert.icon}
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  {cert.name}
                </h4>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">
                  {cert.issuer}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {cert.year}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Summary */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-blue-600">15+</div>
            <div className="text-gray-600 dark:text-gray-400">Technologies</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-purple-600">5+</div>
            <div className="text-gray-600 dark:text-gray-400">Frameworks</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-indigo-600">3+</div>
            <div className="text-gray-600 dark:text-gray-400">Cloud Platforms</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-cyan-600">10+</div>
            <div className="text-gray-600 dark:text-gray-400">Tools & Services</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills