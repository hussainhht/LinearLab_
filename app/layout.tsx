import type { Metadata, Viewport } from 'next'
import { Atkinson_Hyperlegible_Next, Noto_Sans_Arabic, STIX_Two_Text } from 'next/font/google'
import type { ReactNode } from 'react'
import { SiteFooter, SiteHeader } from '@/components/layout/SiteHeader'
import { WorkspaceProvider } from '@/components/tools/WorkspaceProvider'
import { ToastProvider } from '@/components/ui/Toaster'
import { themeInitScript } from '@/lib/theme'
import { LanguageProvider, SkipLink } from '@/components/i18n/LanguageProvider'
import { InterfaceTitle } from '@/components/i18n/InterfaceTitle'
import { languageInitScript } from '@/lib/i18n/language'
import './globals.css'

const serif = STIX_Two_Text({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-stix',
  display: 'swap',
})

const sans = Atkinson_Hyperlegible_Next({
  subsets: ['latin'],
  variable: '--font-atkinson',
  display: 'swap',
  // Next.js has no metric overrides for this family yet; fall back to the system stack instead.
  adjustFontFallback: false,
})

const arabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'LinearLab — learn linear algebra step by step',
    template: '%s · LinearLab',
  },
  description:
    'An interactive linear algebra course with an exact step-by-step Gauss–Jordan solver, matrix operations, and guided row-reduction practice.',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f3f6f5' },
    { media: '(prefers-color-scheme: dark)', color: '#15221e' },
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${serif.variable} ${sans.variable} ${arabic.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: languageInitScript }} />
      </head>
      <body>
        <LanguageProvider>
          <InterfaceTitle />
          <SkipLink />
          <ToastProvider>
            <WorkspaceProvider>
              <SiteHeader />
              <main id="main" tabIndex={-1}>
                {children}
              </main>
              <SiteFooter />
            </WorkspaceProvider>
          </ToastProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
