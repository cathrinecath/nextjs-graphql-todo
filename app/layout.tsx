import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import ApolloClientProvider from '@/providers/ApolloProvider'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'NestList — Your Personal Checklist',
    template: '%s | NestList',
  },
  description: 'A clean, simple checklist app to keep your tasks organised.',
  openGraph: {
    title: 'NestList — Your Personal Checklist',
    description: 'A clean, simple checklist app to keep your tasks organised.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-gray-50 min-h-screen antialiased`}>
        <ApolloClientProvider>{children}</ApolloClientProvider>
      </body>
    </html>
  )
}
