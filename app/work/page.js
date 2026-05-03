import { siteConfig } from '@/data/config'
import WorkClient    from './WorkClient'

export const metadata = {
  title:       `Work — ${siteConfig.name}`,
  description: 'Penelitian, publikasi, dan pengajaran.',
}

export default function WorkPage() {
  return <WorkClient />
}
