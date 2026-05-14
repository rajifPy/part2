/**
 * data/blog.js
 * ─────────────────────────────────────────────────────────
 * Tambahkan artikel baru dengan menyalin template di bawah.
 * Field `body` menggunakan format MARKDOWN.
 *
 * PANDUAN SINGKAT MARKDOWN:
 *   **tebal**          → teks tebal
 *   *miring*           → teks miring
 *   ## Judul           → sub-judul besar
 *   ### Sub-judul      → sub-judul kecil
 *   - item             → daftar bullet
 *   1. item            → daftar nomor
 *   > kutipan          → blok quote
 *   [teks](url)        → link
 *   ![alt](/path/img)  → gambar (alt = keterangan di bawah)
 *   ---                → garis pemisah
 *   `kode`             → kode inline
 *
 * category: 'Pendidikan' | 'Islam' | 'Refleksi' | 'Teknologi' | 'Pengalaman'
 * color:    '#c94f35' (merah) | '#8a7d3a' (olive) | '#6b1f3a' (maroon) | '#d4604a' (salmon)
 * ─────────────────────────────────────────────────────────
 */

export const blogPosts = [
  {
    id:       'inovasi-pai-digital',
    date:     '10 Mei 2025',
    category: 'Pendidikan',
    title:    'Inovasi Pembelajaran PAI di Era Digital',
    excerpt:  'Bagaimana teknologi dapat menjadi jembatan antara nilai-nilai keagamaan Islam dan generasi muda yang tumbuh di tengah arus digitalisasi.',
    readTime: '5 menit',
    tags:     ['PAI', 'Digital', 'Inovasi', 'Pendidikan'],
    color:    '#c94f35',
    body: `
Era digital membawa perubahan besar dalam dunia pendidikan, termasuk Pendidikan Agama Islam (PAI). Tantangan terbesar bukan terletak pada teknologinya, melainkan pada bagaimana kita sebagai pendidik mampu **mengintegrasikan nilai-nilai Islam** ke dalam media yang relevan dengan kehidupan peserta didik.

![alt](/image/hijab_cantik.jpg)
## Mengapa Inovasi itu Perlu?

Dalam pengalaman saya mengajar di bimbel dan PPL di MA Hasyim Asy'ari, saya menemukan bahwa siswa jauh lebih antusias ketika materi disajikan melalui media interaktif — video pendek, kuis digital, hingga diskusi berbasis aplikasi pesan.

> "Kunci inovasi PAI digital bukan sekadar menggunakan gadget di kelas, melainkan merancang pengalaman belajar yang membuat nilai-nilai Islam terasa hidup dan relevan."

Ini bukan berarti meninggalkan metode klasik, tetapi melengkapinya.

### Tiga Prinsip Utama

- **Relevansi** — Materi harus terhubung dengan keseharian siswa
- **Interaktivitas** — Dorong keterlibatan aktif, bukan pasif
- **Nilai** — Teknologi adalah alat, bukan tujuan

## Praktik Nyata di Kelas

Ketika siswa bisa berdiskusi tentang **etika media sosial dari perspektif Islam**, atau menganalisis konten digital dengan kacamata akhlak — di situlah pembelajaran benar-benar terjadi.

Beberapa platform yang saya gunakan selama PPL:

1. Google Forms untuk kuis harian
2. Padlet untuk diskusi kelas
3. YouTube untuk video materi
4. WhatsApp Group untuk tanya jawab

---

Ke depan, saya percaya kurikulum PAI perlu memasukkan literasi digital sebagai komponen inti. Generasi yang tumbuh dengan smartphone di tangan perlu dibekali kemampuan memilah informasi digital dengan landasan iman yang kuat.

Baca referensi terkait di [Jurnal Pendidikan Islam](https://journal.uinsgd.ac.id/index.php/jpi).
    `,
  },

  {
    id:       'kkl-unj-refleksi',
    date:     '5 Juli 2025',
    category: 'Pengalaman',
    title:    'Refleksi KKL di Universitas Negeri Jakarta',
    excerpt:  'Studi banding ke UNJ membuka wawasan baru tentang manajemen pendidikan tinggi dan inovasi akademik yang bisa diadaptasi di lingkungan kampus sendiri.',
    readTime: '4 menit',
    tags:     ['KKL', 'UNJ', 'Studi Banding', 'Refleksi'],
    color:    '#8a7d3a',
    body: `
Kuliah Kerja Lapangan (KKL) ke Universitas Negeri Jakarta pada 30 Juni 2025 menjadi salah satu pengalaman paling berkesan selama masa studi saya di UNISNU Jepara.

## Kesan Pertama

Mengunjungi kampus dengan tradisi akademik yang panjang dan beragam program inovatif membuka perspektif baru yang tidak bisa didapat hanya dari buku teks.

Yang paling mengesankan adalah bagaimana UNJ **mengintegrasikan teknologi** dalam proses akademik mereka — mulai dari sistem manajemen pembelajaran yang tertata hingga pusat sumber belajar yang lengkap.

> "Ini bukan kemewahan, melainkan standar yang perlu kita kejar bersama."

## Yang Saya Pelajari

Diskusi dengan mahasiswa dan dosen di sana memberikan insight berharga:

- Ada *gap* antara teori di kampus dan realita di sekolah
- UNJ sedang berupaya keras menjembatani kesenjangan itu
- Kolaborasi lintas prodi menjadi kunci inovasi

---

Pulang dari KKL, saya membawa satu tekad: apa yang saya pelajari di sana harus saya terapkan, sekecil apapun kontribusinya, di lingkungan mengajar saya sendiri.
    `,
  },

  {
    id:       'literasi-digital-islam',
    date:     '20 Maret 2025',
    category: 'Islam',
    title:    'Literasi Digital dalam Perspektif Islam',
    excerpt:  'Islam mengajarkan kita untuk tabayyun — memverifikasi kebenaran informasi sebelum menyebarkannya. Di era banjir informasi, prinsip ini lebih relevan dari sebelumnya.',
    readTime: '6 menit',
    tags:     ['Islam', 'Literasi Digital', 'Tabayyun', 'Media'],
    color:    '#6b1f3a',
    body: `
Dalam Al-Qur'an surat **Al-Hujurat ayat 6**, Allah berfirman agar kita senantiasa melakukan *tabayyun* ketika menerima berita dari seseorang yang kita tidak ketahui kredibilitasnya.

Ayat yang turun lebih dari 14 abad lalu ini terasa sangat kontekstual dengan tantangan literasi digital yang kita hadapi hari ini.

## Ancaman Nyata di Era Digital

Hoaks, misinformasi, dan propaganda digital menjadi ancaman nyata di era media sosial. Yang lebih mengkhawatirkan, banyak konten semacam ini justru menyebar di kalangan umat Islam dengan bungkus agama:

- Ayat yang diputus konteksnya
- Hadits yang direkayasa
- Foto-foto yang diklaim sebagai sesuatu yang bukan sebenarnya

> "Sebagai mahasiswa PAI, saya melihat ini sebagai tanggung jawab untuk mengajarkan peserta didik menjadi muslim yang cerdas bermedia digital."

## Fondasi Islam untuk Literasi Digital

Kemampuan yang perlu diajarkan:

1. **Verifikasi sumber** — cek ke sumber asli sebelum share
2. **Pahami bias** — setiap media punya sudut pandang
3. **Berpikir kritis** — jangan langsung percaya judul berita

---

Literasi digital bukan ancaman bagi nilai-nilai Islam. Justru sebaliknya — Islam sudah memberikan fondasi epistemologi yang kuat untuk menjadi warga digital yang bertanggung jawab.

Pelajari lebih lanjut tentang tabayyun di [Islam.nu.or.id](https://islam.nu.or.id).
    `,
  },

  {
    id:       'menjadi-guru-muda',
    date:     '15 Januari 2025',
    category: 'Refleksi',
    title:    'Catatan Seorang Guru Muda: Belajar dari Kesalahan',
    excerpt:  'PPL bukan hanya tentang mengajar — ini tentang belajar menjadi guru yang sesungguhnya, lengkap dengan segala kegelisahan dan momen aha-nya.',
    readTime: '5 menit',
    tags:     ['PPL', 'Guru', 'Refleksi', 'Mengajar'],
    color:    '#d4604a',
    body: `
Ketika pertama kali berdiri di depan kelas X di MA Hasyim Asy'ari selama PPL, saya merasa sudah cukup siap. RPP sudah tersusun rapi, materi sudah dikuasai, metode sudah direncanakan.

Tapi kenyataan berbicara lain — **30 pasang mata yang memandang balik** ternyata jauh berbeda dari yang saya bayangkan.

## Sesi Pertama yang Canggung

Sesi pertama berjalan canggung. Saya terlalu kaku mengikuti RPP, kurang peka terhadap respons siswa, dan gagal menciptakan momen keterlibatan yang bermakna.

Pulang mengajar, saya merenung panjang. Apa yang salah?

> "Mengajar bukan tentang menyampaikan informasi, melainkan tentang menciptakan koneksi."

## Titik Balik

Pelan-pelan saya menyadari perubahan yang perlu dilakukan:

- Lebih banyak **bertanya** daripada menjelaskan
- Lebih banyak **mendengar** daripada berbicara
- Memberi ruang bagi siswa untuk **berpendapat**

Ketika saya mulai menerapkan ini, kelas mulai hidup. Siswa yang tadinya diam mulai berani berpendapat.

## Pelajaran yang Dibawa Pulang

Dari PPL ini saya belajar bahwa menjadi guru yang baik adalah perjalanan panjang yang tidak pernah benar-benar selesai.

1. Setiap kelas adalah pelajaran baru
2. Setiap siswa adalah guru yang menyamar
3. Kegagalan — selama kita mau belajar darinya — adalah guru terbaik

---

*Terima kasih kepada Bapak/Ibu guru pamong yang telah membimbing selama PPL berlangsung.*
    `,
  },

  // ─────────────────────────────────────────────────────────
  // TEMPLATE ARTIKEL BARU — hapus komentar ini dan isi datanya
  // ─────────────────────────────────────────────────────────
  //
  // {
  //   id:       'id-unik-artikel',       // URL: /blog/id-unik-artikel
  //   date:     '1 Januari 2026',
  //   category: 'Pendidikan',            // Pendidikan | Islam | Refleksi | Teknologi | Pengalaman
  //   title:    'Judul Artikel Kamu',
  //   excerpt:  'Ringkasan singkat 1-2 kalimat yang muncul di halaman blog.',
  //   readTime: '5 menit',
  //   tags:     ['Tag1', 'Tag2', 'Tag3'],
  //   color:    '#c94f35',               // Warna aksen artikel
  //   body: `
  // Tulis isi artikel kamu di sini pakai markdown.
  //
  // ## Sub-judul
  //
  // Paragraf biasa ditulis langsung tanpa format khusus.
  //
  // ![Keterangan gambar](/image/nama-gambar.jpg)
  //
  // [Teks link](https://url-tujuan.com)
  //   `,
  // },
]
