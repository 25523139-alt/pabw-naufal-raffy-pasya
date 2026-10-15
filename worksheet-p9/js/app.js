export const profil = {
  nama: "Naufal Raffy Pasya",
  nim: "25523139",
  kelas: "C",
  peran: "Mahasiswa Informatika",
  minat: "Saya membuat arsip pribadi bertema Punishing: Gray Raven.",
  keahlian: ["HTML5", "CSS", "Bootstrap 5", "Responsive mobile-first"],
};

// Setiap proyek menyimpan kategori filter dan label yang ditampilkan di kartu.
export const daftarProyek = [
  {
    judul: "Profil Novel dan Anime",
    tahun: 2026,
    category: "p3",
    kategori: "P3 · HTML5",
    status: "Selesai",
    selesai: true,
    deskripsi: "Halaman profil untuk mencatat bacaan novel, fanfiction, dan anime favorit.",
  },
  {
    judul: "Design Token Profil",
    tahun: 2026,
    category: "p4",
    kategori: "P4 · CSS",
    status: "Selesai",
    selesai: true,
    deskripsi: "Token warna dan tema gelap untuk halaman profil hobi.",
  },
  {
    judul: "Arsip Komandan Gray Raven",
    tahun: 2026,
    category: "p6",
    kategori: "P6 · Responsive web",
    status: "Selesai",
    selesai: true,
    deskripsi: "Arsip pribadi Punishing: Gray Raven yang memakai Bootstrap dan tata letak responsif.",
  },
  {
    judul: "Profil dengan JavaScript ES6+",
    tahun: 2026,
    category: "p8",
    kategori: "P8 · JavaScript",
    status: "Dalam pengerjaan",
    selesai: false,
    deskripsi: "Data profil dan daftar proyek ditampilkan dari object serta array JavaScript.",
  },
];

// Fungsi murni: menghasilkan teks tanpa mengubah data atau halaman.
export function buatPerkenalan({ nama, peran }) {
  return `Nama saya ${nama}, saya ${peran}.`;
}

// Fungsi murni: mengubah array keahlian menjadi teks untuk profil.
export const formatKeahlian = (daftar) => daftar.join(" · ");

// Properti opsional belum diisi di data P8, jadi gunakan teks pengganti.
export const kota = profil.alamat?.kota ?? "Belum dicantumkan";
