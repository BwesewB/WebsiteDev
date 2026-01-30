import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TextHoverImage',
  description: 'Interactive hover image preview with animations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
