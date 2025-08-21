'use client'

import { 
  GithubIcon, 
  LinkedinIcon, 
  TwitterIcon, 
  MailIcon,
  HeartIcon
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <GithubIcon className="h-5 w-5" />,
      href: 'https://github.com/faheema15',
      color: 'hover:text-gray-900 dark:hover:text-gray-100'
    },
    {
      name: 'LinkedIn',
      icon: <LinkedinIcon className="h-5 w-5" />,
      href: 'https://www.linkedin.com/in/sabura-faheema-83a0ab226/',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Twitter',
      icon: <TwitterIcon className="h-5 w-5" />,
      href: 'https://x.com/sabu_f_',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Email',
      icon: <MailIcon className="h-5 w-5" />,
      href: 'mailto:faheema0315@gmail.com',
      color: 'hover:text-red-500'
    }
  ]

  const quickLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ]

  const services = [
    'AI/ML Development',
    'Full Stack Development',
    'Cloud Solutions',
    'API Development',
    'System Architecture',
    'Technical Consulting'
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.replace('#', ''))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h3 className="text-2xl font-bold gradient-text mb-3">
                  Sabura Faheema
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  AI + Full Stack Developer passionate about creating intelligent, 
                  scalable solutions that make a difference.
                </p>
              </div>
              
              {/* Social Links */}
              <div>
                <h4 className="font-semibold text-white mb-4">Connect With Me</h4>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-gray-700`}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="font-semibold text-white">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h4 className="font-semibold text-white">Services</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <span className="text-gray-400 hover:text-white transition-colors duration-300">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="font-semibold text-white">Get In Touch</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Email</p>
                  <a 
                    href="mailto:faheema0315@gmail.com"
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    faheema0315@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Location</p>
                  <p className="text-gray-300">India</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Availability</p>
                  <p className="text-gray-300">Open for projects</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter/CTA Section */}
          <div className="mt-16 pt-12 border-t border-gray-800">
            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Let's Build Something Amazing Together
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Ready to turn your ideas into reality? Whether it's AI integration, 
                full-stack development, or cloud solutions, I'm here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Start a Project
                </button>
                <a
                  href="https://github.com/faheema15"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
                >
                  View My Code
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <span>© {currentYear} Sabura Faheema. Made with</span>
              <HeartIcon className="h-4 w-4 text-red-500" />
              <span>and lots of ☕</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="hover:text-white transition-colors duration-300 flex items-center gap-1"
              >
                <span>Back to Top</span>
                <span>↑</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tech Stack Credits */}
        {/* <div className="py-4 border-t border-gray-800">
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Built with React, Next.js, Tailwind CSS, and deployed on Vercel
            </p>
            <div className="flex justify-center gap-4 mt-2 text-xs text-gray-500">
              <span>⚡ Performance Optimized</span>
              <span>📱 Mobile Responsive</span>
              <span>♿ Accessibility Focused</span>
              <span>🔒 Secure by Design</span>
            </div>
          </div>
        </div> */}
      </div>
    </footer>
  )
}

export default Footer