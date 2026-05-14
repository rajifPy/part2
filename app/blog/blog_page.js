import { siteConfig } from '@/data/config'
import BlogClient from './BlogClient'

export const metadata = {
  title:       `Blog — ${siteConfig.name}`,
  description: 'Tulisan dan refleksi tentang pendidikan, Islam, dan perjalanan belajar.',
}

export default function BlogPage() {
  return <BlogClient />
}
