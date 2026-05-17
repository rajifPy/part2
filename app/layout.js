import '../styles/globals.css'
import Navbar           from '@/components/layout/Navbar'
import Footer           from '@/components/layout/Footer'
import LoadingScreen    from '@/components/ui/LoadingScreen'
import ButterflyFollower from '@/components/ui/ButterflyFollower'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { siteConfig }   from '@/data/config'

export const metadata = {
  title:       siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    title:       siteConfig.title,
    description: siteConfig.description,
    type:        'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            var t = localStorage.getItem('theme');
            document.documentElement.setAttribute('data-theme', t || 'dark');
          })()
        `}} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Work+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Kupu-kupu mengikuti kursor — z-index 99999, pointer-events none */}
        <ThemeProvider>
          <ButterflyFollower />
  
          <LoadingScreen name={siteConfig.name} />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
