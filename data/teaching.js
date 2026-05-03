/**
 * data/teaching.js
 *
 * Data pengajaran: mata kuliah utama (lectured) dan seminar tamu (guest).
 */

export const teaching = {

  lectured: [
    {
      id:       'course-1',
      year:     '2025 — 2026',
      title:    'Judul Mata Kuliah Utama',
      subtitle: 'Subjudul: Tema yang Dieksplorasi Kursus Ini',
      image:    null,

      body: [
        `Paragraf pertama: gambaran umum seminar. Jelaskan pertanyaan utama,
        tema besar, dan format pembelajaran.`,

        `Paragraf kedua: tiga tema atau skala utama yang menjadi kerangka kursus.`,

        `Paragraf ketiga: konteks dan relevansi kursus.`,
      ],

      meta: [
        { label: 'Tahun',    value: '2025 — 2026' },
        { label: 'Pengajar', value: 'Nama Anda' },
      ],
      pdfUrl: null,
    },

    {
      id:       'course-2',
      year:     '2021 — 2022',
      title:    'Judul Mata Kuliah Kedua',
      subtitle: 'Mempertimbangkan Ulang Praktik di Luar Kepengarangan',
      image:    null,

      body: [
        `Paragraf pertama: deskripsi workshop atau seminar.`,
        `Paragraf kedua: metodologi pengajaran dan jenis output yang diharapkan.`,
      ],

      meta: [
        { label: 'Tahun',    value: '2021 — 2022' },
        { label: 'Pengajar', value: 'Nama Anda' },
      ],
      pdfUrl: null,
    },
  ],

  guest: [
    {
      year:     '2025',
      citation: "Workshop (bersama Nama Kolaborator) 'Judul Workshop'",
      url:      null,
    },
    {
      year:     '2025',
      citation: "Keynote Lecture 'Judul Ceramah,' Nama Konferensi 2025, Nama Universitas",
      url:      null,
    },
    {
      year:     '2025',
      citation: "Public Lecture 'Judul Ceramah,' Nama Institusi",
      url:      'https://www.youtube.com/watch?v=contoh',
    },
    {
      year:     '2024',
      citation: "Invited Seminar 'Judul Seminar,' Nama Departemen, Nama Universitas",
      url:      null,
    },
  ],
}
