import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sabura Faheema',
  description: 'AI + Full Stack Developer specializing in modern web applications, machine learning, and cloud technologies. Building scalable solutions with React, Next.js, Python, and AI.',
  keywords: 'AI Developer, Full Stack Developer, React, Next.js, Python, Machine Learning, Web Development',
  authors: [{ name: 'Sabura Faheema' }],
  creator: 'Sabura Faheema',
  publisher: 'Sabura Faheema',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Sabura Faheema - AI + Full Stack Developer',
    description: 'AI + Full Stack Developer specializing in modern web applications, machine learning, and cloud technologies.',
    url: 'https://saburafaheema.dev',
    siteName: 'Sabura Faheema Portfolio',
    images: [
      {
        url: 'https://saburafaheema.dev/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sabura Faheema - AI + Full Stack Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sabura Faheema - AI + Full Stack Developer',
    description: 'AI + Full Stack Developer specializing in modern web applications, machine learning, and cloud technologies.',
    images: ['https://saburafaheema.dev/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={`${inter.className} bg-slate-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        {children}
      </body>
    </html>
  )
}