import { siteConfig } from '@/data/config'
import NewsClient    from './NewsClient'

export const metadata = {
  title:       `News — ${siteConfig.name}`,
  description: 'Berita dan kegiatan terbaru.',
}

export default function NewsPage() {
  return <NewsClient />
}
