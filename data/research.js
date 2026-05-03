/**
 * data/research.js
 *
 * Data proyek penelitian Anda.
 * Setiap objek = satu card di halaman Work + modal detail.
 */

export const researchProjects = [
  {
    id: 'project-postdoc',

    year:     '2024',
    title:    'Judul Proyek Postdoktoral Anda',
    subtitle: 'Postdoctoral project',
    tagline:  'Deskripsi singkat: fokus geografis, temporal, atau tematik proyek ini.',
    image:    null,

    body: [
      `Paragraf pertama: latar belakang dan lingkup proyek. Jelaskan konteks
      historiografi, pertanyaan penelitian utama, dan relevansi akademisnya.
      Sebutkan sumber pendanaan dan institusi afiliasi.`,

      `Paragraf kedua: metodologi dan sumber. Sebutkan arsip yang dikunjungi,
      metode oral history, dan pendekatan analitis. Jelaskan tiga fokus
      spasial atau tematik utama yang menjadi kerangka proyek.`,

      `Paragraf ketiga: temuan awal dan kontribusi pada bidang studi.
      Sebutkan koneksi lintas-regional atau internasional yang ditemukan
      selama fieldwork.`,
    ],

    meta: [
      { label: 'Tahun',     value: '2024 — ongoing' },
      { label: 'Pendanaan', value: 'Nama Lembaga Pendana (Postdoctoral research)' },
    ],

    images: [
      {
        src:     null,
        caption: 'Keterangan gambar pertama. Sumber: Nama Arsip, nama koleksi, referensi.',
      },
      {
        src:     null,
        caption: 'Keterangan gambar kedua. Sumber: Nama Arsip.',
      },
    ],

    pdfUrl: null,
  },

  {
    id: 'project-phd',

    year:     '2018',
    title:    'Judul Proyek PhD Anda',
    subtitle: 'PhD project',
    tagline:  'Deskripsi singkat: institusi yang diteliti, periode waktu, pendekatan metodologi.',
    image:    null,

    body: [
      `Paragraf pertama: pengantar proyek PhD. Jelaskan institusi yang diteliti,
      rentang waktu, dan kombinasi pendekatan.`,

      `Paragraf kedua: sumber arsip dan fieldwork. Sebutkan lokasi penelitian
      lapangan, periode pelaksanaannya, dan jenis dokumen yang menjadi
      sumber utama.`,

      `Paragraf ketiga: argumen utama tesis dan kontribusi pada debat
      historiografi.`,
    ],

    meta: [
      { label: 'Tahun',     value: '2018 — 2023' },
      { label: 'Pendanaan', value: 'Nama Beasiswa (PhD research)' },
    ],

    images: [
      { src: null, caption: 'Keterangan dokumen arsip.' },
      { src: null, caption: 'Keterangan gambar kedua.' },
      { src: null, caption: 'Keterangan gambar ketiga.' },
    ],

    pdfUrl: null,
  },
]
