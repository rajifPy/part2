import { siteConfig } from '@/data/config'
import GaleriClient  from './GaleriClient'

export const metadata = {
  title:       `Galeri — ${siteConfig.name}`,
  description: 'Foto dan dokumentasi kegiatan.',
}

export default function GaleriPage() {
  return <GaleriClient />
}
