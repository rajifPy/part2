import { siteConfig }        from '@/data/config'
import TentangSayaClient     from './TentangSayaClient'

export const metadata = {
  title:       `Tentang Saya — ${siteConfig.name}`,
  description: `Profil dan biografi ${siteConfig.name}, ${siteConfig.role}.`,
}

export default function TentangSayaPage() {
  return <TentangSayaClient />
}
