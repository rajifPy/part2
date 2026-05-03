import { siteConfig } from '@/data/config'
import AboutClient    from './AboutClient'

export const metadata = {
  title:       `About — ${siteConfig.name}`,
  description: `Tentang ${siteConfig.name}, ${siteConfig.role}.`,
}

export default function AboutPage() {
  return <AboutClient />
}
