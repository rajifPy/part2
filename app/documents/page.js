import { siteConfig }   from '@/data/config'
import DocumentsClient from './DocumentsClient'

export const metadata = {
  title:       `Documents — ${siteConfig.name}`,
  description: 'CV, silabus, dan dokumen akademik.',
}

export default function DocumentsPage() {
  return <DocumentsClient />
}
