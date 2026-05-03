/**
 * data/publications.js
 *
 * Semua publikasi akademik, dikelompokkan per kategori.
 * Format sitasi bebas — tulis sesuai gaya yang Anda gunakan.
 * Jika url = null, item tidak akan menjadi link.
 */

export const publications = {

  // ── Artikel jurnal peer-reviewed ─────────────────────────────
  peer: [
    {
      year:     '2024',
      citation: 'Nama Anda (2024). Judul Artikel Lengkap. Nama Jurnal, (21).',
      url:      'https://doi.org/10.xxxx/xxxxx',
    },
    {
      year:     '2022',
      citation: 'Nama Anda. Judul Artikel: Subjudul. Nama Jurnal, 37, 6–22.',
      url:      'https://doi.org/10.xxxx/xxxxx',
    },
    // Tambahkan artikel baru di sini ↓
  ],

  // ── Bab dalam buku yang diedit ───────────────────────────────
  chapters: [
    {
      year:     '2025',
      citation: 'Nama Anda "Judul Bab," Dalam: Nama Editor (Ed.) Judul Buku, Nama Penerbit, hlm. 124–140.',
      url:      null,
    },
    {
      year:     '2024',
      citation: 'Nama Anda "Judul Bab," Dalam: Nama Editor (ed.) Judul Buku, Penerbit, hlm. 219–250.',
      url:      null,
    },
    {
      year:     '2018',
      citation: 'Nama Anda "Judul Bab," Dalam: Nama Editor (ed.) Judul Kumpulan, Penerbit, hlm. 187–200.',
      url:      null,
    },
    // Tambahkan bab baru di sini ↓
  ],

  // ── Ulasan buku & konferensi ─────────────────────────────────
  reviews: [
    {
      year:     '2020',
      citation: 'Nama Anda "Conference Review: Nama Konferensi — Tema Konferensi," Nama Jurnal/Platform.',
      url:      null,
    },
    {
      year:     '2020',
      citation: 'Nama Anda "Book Review: Judul Buku yang Direview," Nama Jurnal.',
      url:      null,
    },
    // Tambahkan ulasan baru di sini ↓
  ],

  // ── Tulisan publik / popular ─────────────────────────────────
  public: [
    {
      year:     '2024',
      citation: "Nama Anda 'Judul Artikel Populer,' Nama Majalah, No. 101, Edisi Khusus, hlm. 46–48.",
      url:      null,
    },
    {
      year:     '2018',
      citation: "Nama Anda (2018) 'Judul Artikel,' Nama Publikasi Digital.",
      url:      'https://contoh.com/artikel',
    },
    // Tambahkan tulisan publik baru di sini ↓
  ],
}
