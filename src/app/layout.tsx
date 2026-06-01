// src/app/layout.tsx
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import './globals.css'

export const metadata: Metadata = {
  title: 'PixelPeak SMP — Server Survival Terbaik Indonesia',
  description: 'Server Minecraft Survival terbaik di Indonesia. Java & Bedrock. 24/7 Online.',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: 'PixelPeak SMP',
    description: 'Server Minecraft Survival terbaik di Indonesia',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#22d3ee',
          colorBackground: '#1a1f2e',
          colorText: '#ffffff',
          colorTextSecondary: '#94a3b8',
          colorInputBackground: '#0f1117',
          colorInputText: '#ffffff',
          borderRadius: '12px',
        },
      }}
    >
      <html lang="id">
        <body>
          {children}
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                background: '#1a1f2e',
                border: '1px solid rgba(34,211,238,0.2)',
                color: 'white',
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  )
}
