  'use client'

  import { useState } from 'react'
  import { 
    EnvelopeIcon, 
    PhoneIcon, 
    MapPinIcon, 
    PaperAirplaneIcon,
    CheckCircleIcon,
    ExclamationCircleIcon
  } from '@heroicons/react/24/outline'
  import { 
    GithubIcon, 
    LinkedinIcon, 
    TwitterIcon, 
    MailIcon 
  } from 'lucide-react'

  const Contact = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null) // 'success', 'error', null

    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      setIsSubmitting(true)
      setSubmitStatus(null)

      try {
        const response = await fetch('/api/send-message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            source: 'contact-form'
          }),
        })

        const result = await response.json()

        if (response.ok) {
          setSubmitStatus('success')
          setFormData({ name: '', email: '', message: '' })
        } else {
          setSubmitStatus('error')
          console.error('Error:', result.error)
        }
      } catch (error) {
        setSubmitStatus('error')
        console.error('Error:', error)
      } finally {
        setIsSubmitting(false)
      }
    }

    const contactInfo = [
      {
        icon: <EnvelopeIcon className="h-6 w-6" />,
        label: 'Email',
        value: 'faheema0315@gmail.com',
        href: 'mailto:faheema0315@gmail.com',
        color: 'text-blue-600'
      },
      {
        icon: <MapPinIcon className="h-6 w-6" />,
        label: 'Location',
        value: 'India',
        color: 'text-green-600'
      },
      {
        icon: <PhoneIcon className="h-6 w-6" />,
        label: 'Available',
        value: '24/7 for projects',
        color: 'text-purple-600'
      }
    ]

    const socialLinks = [
      {
        name: 'GitHub',
        icon: <GithubIcon className="h-6 w-6" />,
        href: 'https://github.com/faheema15',
        color: 'hover:text-gray-900 dark:hover:text-gray-100'
      },
      {
        name: 'LinkedIn',
        icon: <LinkedinIcon className="h-6 w-6" />,
        href: 'https://www.linkedin.com/in/sabura-faheema-83a0ab226/',
        color: 'hover:text-blue-600'
      },
      {
        name: 'Twitter',
        icon: <TwitterIcon className="h-6 w-6" />,
        href: 'https://x.com/sabu_f_',
        color: 'hover:text-blue-400'
      },
      {
        name: 'Email',
        icon: <MailIcon className="h-6 w-6" />,
        href: 'mailto:faheema0315@gmail.com',
        color: 'hover:text-red-500'
      }
    ]

    return (
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full text-green-600 dark:text-green-400 font-medium mb-4">
              <span>💬</span>
              <span>Get In Touch</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Let's Build Something
              <span className="block gradient-text">Together</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Have a project in mind? Whether it's AI integration, full-stack development, 
              or cloud solutions, I'd love to hear about your ideas and help bring them to life.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Let's Connect
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                  I'm always excited to discuss new opportunities, collaborate on innovative projects, 
                  or simply chat about the latest in AI and web development. Feel free to reach out!
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 ${item.color} bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-lg`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a 
                          href={item.href}
                          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Follow Me
                </h4>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg group`}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Fun Fact */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">⚡</div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                      Quick Response Time
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      I typically respond to emails within 24 hours. For urgent projects, 
                      feel free to mention it in your message!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send Me a Message
              </h3>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <p className="text-green-700 dark:text-green-300">
                      Message sent successfully! I'll get back to you soon.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
                    <p className="text-red-700 dark:text-red-300">
                      Failed to send message. Please try again or email me directly.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-vertical"
                    placeholder="Tell me about your project, timeline, requirements, or any questions you have..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <PaperAirplaneIcon className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  By sending this message, you agree that I may contact you regarding your inquiry.
                  Your information will be kept confidential.
                </p>
              </div>
            </div>
          </div>

          {/* Call-to-Action Section */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 lg:p-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                From concept to deployment, I'll help you build scalable, intelligent solutions 
                that drive real business value.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:faheema0315@gmail.com"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Email Me Directly
                </a>
                <a
                  href="https://www.linkedin.com/in/sabura-faheema-83a0ab226/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  export default Contact