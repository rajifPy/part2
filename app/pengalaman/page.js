import { siteConfig }     from '@/data/config'
import PengalamanClient   from './PengalamanClient'

export const metadata = {
  title:       `Pengalaman — ${siteConfig.name}`,
  description: 'Penelitian, publikasi, dan pengajaran.',
}

export default function PengalamanPage() {
  return <PengalamanClient />
}
