'use client'

import { useState, useRef, useEffect } from 'react'
import { 
  ChatBubbleLeftRightIcon, 
  XMarkIcon, 
  PaperAirplaneIcon,
  SparklesIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline'

const AIChatbotDemo = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! 👋 I'm Sabura's AI assistant. How can I help you today?",
      timestamp: new Date()
    }
  ])
  const [currentMessage, setCurrentMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' })
  const [isCollectingInfo, setIsCollectingInfo] = useState(false)
  const [infoStep, setInfoStep] = useState('name') // 'name', 'email', 'phone'
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const botResponses = [
    "Thanks for reaching out! I'll make sure Sabura sees your message and gets back to you soon. 🚀",
    "Got it! Your message has been forwarded to Sabura. She'll respond as quickly as possible! ⚡",
    "Perfect! I've noted down your query. Sabura will be in touch with you shortly! 💬",
    "Message received! Sabura is passionate about AI and full-stack development, so she'll love to discuss your project! 🤖",
    "Excellent! Your message is now with Sabura. She's always excited to work on innovative projects! 💡"
  ]

  const detectContactInfo = (message) => {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g
    const phoneRegex = /(\+\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g
    
    const emailMatch = message.match(emailRegex)
    const phoneMatch = message.match(phoneRegex)
    
    return {
      email: emailMatch ? emailMatch[0] : null,
      phone: phoneMatch ? phoneMatch[0] : null
    }
  }

  const extractNameFromMessage = (message) => {
    // Try to extract name from patterns like "I'm John", "My name is John", "John (email@example.com)"
    const patterns = [
      /(?:i'?m|my name is|call me)\s+([a-zA-Z]+)/i,
      /^([a-zA-Z]+)\s*\(/,  // Name before parentheses
      /^([a-zA-Z\s]+?)\s*\(/,  // Multi-word name before parentheses
    ]
    
    for (const pattern of patterns) {
      const match = message.match(pattern)
      if (match) {
        return match[1].trim()
      }
    }
    
    // If no pattern matches, check if it's just a name (single or two words)
    const words = message.trim().split(/\s+/)
    if (words.length <= 2 && words.every(word => /^[a-zA-Z]+$/.test(word))) {
      return message.trim()
    }
    
    return null
  }

  const addMessage = (type, content, delay = 0) => {
    setTimeout(() => {
      const newMessage = {
        id: Date.now() + Math.random(),
        type,
        content,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, newMessage])
    }, delay)
  }

  const sendMessageToEmail = async (messageData) => {
    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: messageData.name || 'Chatbot User',
          email: messageData.email || 'No email provided',
          message: `
Chatbot Conversation:

User Message: ${messageData.originalMessage}

Contact Information:
- Name: ${messageData.name || 'Not provided'}
- Email: ${messageData.email || 'Not provided'}
- Phone: ${messageData.phone || 'Not provided'}

Timestamp: ${new Date().toLocaleString()}
          `.trim(),
          source: 'chatbot'
        }),
      })

      return response.ok
    } catch (error) {
      console.error('Error sending message:', error)
      return false
    }
  }

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return

    const userMessage = currentMessage.trim()
    setCurrentMessage('')
    
    // Add user message
    addMessage('user', userMessage)
    
    // Show typing indicator
    setIsTyping(true)

    // If collecting user info
    if (isCollectingInfo) {
      setTimeout(() => {
        setIsTyping(false)
        handleInfoCollection(userMessage)
      }, 1000)
      return
    }

    // Detect contact info and name in the message
    const contactInfo = detectContactInfo(userMessage)
    const extractedName = extractNameFromMessage(userMessage)
    
    setTimeout(async () => {
      setIsTyping(false)
      
      // Store the original message
      setUserInfo(prev => ({ ...prev, originalMessage: userMessage }))
      
      // Check what information we have
      const hasEmail = contactInfo.email
      const hasName = extractedName
      const hasPhone = contactInfo.phone
      
      if (hasEmail && hasName) {
        // We have both name and email
        setUserInfo(prev => ({ 
          ...prev, 
          name: extractedName,
          email: contactInfo.email,
          phone: contactInfo.phone || ''
        }))
        
        if (hasPhone) {
          // We have everything, send the message
          addMessage('bot', `Perfect! I have your name (${extractedName}), email (${contactInfo.email}), and phone (${contactInfo.phone}). Let me forward your message to Sabura now... 📤`)
          await sendFinalMessage()
        } else {
          // Ask for phone (optional)
          addMessage('bot', `Great! I have your name (${extractedName}) and email (${contactInfo.email}). Would you like to share your phone number as well? (Optional - you can type 'skip' if you prefer not to)`)
          setIsCollectingInfo(true)
          setInfoStep('phone')
        }
      } else if (hasEmail && !hasName) {
        // We have email but no name
        setUserInfo(prev => ({ ...prev, email: contactInfo.email }))
        addMessage('bot', `Great! I can see your email is ${contactInfo.email}. What's your name so Sabura knows who to respond to?`)
        setIsCollectingInfo(true)
        setInfoStep('name')
      } else if (hasName && !hasEmail) {
        // We have name but no email
        setUserInfo(prev => ({ ...prev, name: extractedName }))
        addMessage('bot', `Nice to meet you, ${extractedName}! What's the best email address to reach you at?`)
        setIsCollectingInfo(true)
        setInfoStep('email')
      } else {
        // We have neither name nor email
        addMessage('bot', "I'd love to help you connect with Sabura! Could you please share your name first?")
        setIsCollectingInfo(true)
        setInfoStep('name')
      }
    }, 1500)
  }

  const sendFinalMessage = async () => {
    setIsSending(true)
    
    const success = await sendMessageToEmail({
      ...userInfo,
      originalMessage: userInfo.originalMessage,
      phone: userInfo.phone || 'Not provided'
    })
    
    setTimeout(() => {
      setIsSending(false)
      if (success) {
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]
        addMessage('bot', randomResponse)
        addMessage('bot', "Is there anything else I can help you with? 😊", 2000)
      } else {
        addMessage('bot', "Oops! There was an issue sending your message. Please try using the contact form on the website instead. 🔧")
      }
      
      // Reset state
      setIsCollectingInfo(false)
      setInfoStep('name')
      setUserInfo({ name: '', email: '', phone: '' })
    }, 2000)
  }

  const handleInfoCollection = async (response) => {
    switch (infoStep) {
      case 'name':
        const name = extractNameFromMessage(response) || response.trim()
        setUserInfo(prev => ({ ...prev, name: name }))
        
        if (userInfo.email) {
          // We already have email, just need phone (optional)
          addMessage('bot', `Nice to meet you, ${name}! Would you like to share your phone number? (Optional - you can type 'skip' if you prefer not to)`)
          setInfoStep('phone')
        } else {
          addMessage('bot', `Nice to meet you, ${name}! What's the best email address to reach you at?`)
          setInfoStep('email')
        }
        break
        
      case 'email':
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
        const emailMatch = response.match(emailRegex)
        
        if (emailMatch) {
          setUserInfo(prev => ({ ...prev, email: emailMatch[0] }))
          addMessage('bot', `Perfect! Would you like to share your phone number as well? (Optional - you can type 'skip' if you prefer not to)`)
          setInfoStep('phone')
        } else {
          addMessage('bot', "That doesn't look like a valid email address. Could you please double-check and try again?")
        }
        break
        
      case 'phone':
        const phoneRegex = /(\+\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
        if (response.toLowerCase() === 'skip') {
          setUserInfo(prev => ({ ...prev, phone: 'Not provided' }))
        } else if (phoneRegex.test(response)) {
          setUserInfo(prev => ({ ...prev, phone: response }))
        } else {
          addMessage('bot', "That doesn't look like a valid phone number. You can try again or type 'skip' to continue without it.")
          return
        }
        
        // All info collected, send message
        addMessage('bot', "Thanks! I'm forwarding your message to Sabura now... 📤")
        await sendFinalMessage()
        break
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chatbot Toggle Button */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`}>
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group relative"
          aria-label="Open AI Assistant"
        >
          <ChatBubbleLeftRightIcon className="h-8 w-8" />
          
          {/* Pulse animation */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 animate-ping opacity-20"></div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Chat with AI Assistant
            <div className="absolute top-full right-4 border-4 border-transparent border-t-gray-900"></div>
          </div>
        </button>
      </div>

      {/* Chatbot Window */}
      <div className={`fixed bottom-6 right-6 z-50 w-80 sm:w-96 h-[500px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <SparklesIcon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">AI Assistant</h3>
              <p className="text-xs opacity-90">Always here to help</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200"
            aria-label="Close chat"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 h-80">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-sm'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-1 opacity-70 ${
                  message.type === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-2 max-w-[80%]">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          {/* Sending Indicator */}
          {isSending && (
            <div className="flex justify-start">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl rounded-bl-sm px-4 py-2 max-w-[80%]">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 dark:border-blue-400"></div>
                  <span className="text-sm">Sending message...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={isSending}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleSendMessage}
              disabled={!currentMessage.trim() || isSending}
              className="w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-colors duration-200"
              aria-label="Send message"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            Powered by AI • Your data is secure
          </p>
        </div>
      </div>
    </>
  )
}

export default AIChatbotDemo