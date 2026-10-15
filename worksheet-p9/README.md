# Pertemuan 9 — DOM, Event, dan Interaktivitas

Proyek ini melanjutkan halaman profil Punishing: Gray Raven dari Meeting 8. Data profil dan proyek berada di `js/app.js`; pemilihan elemen, rendering, filter, tema, dan validasi form berada di `js/dom.js`.

## Menjalankan halaman

Dari folder `worksheet-p9/`, jalankan server lokal:

```powershell
python -m http.server 8000
```

Buka `http://localhost:8000/profile.html`. Kedua file JavaScript menggunakan ES module, jadi halaman perlu dibuka melalui server lokal.

## Fitur Meeting 9

- Kartu proyek dibangun dari array `daftarProyek` dengan `createElement`, `textContent`, dan `append`.
- `render(projects)` selalu mengosongkan container, menangani daftar kosong, lalu membuat kartu.
- Satu listener pada `#filter` menangani seluruh tombol kategori dengan `event.target.closest("button")`.
- Form menghentikan submit bawaan, memeriksa nilai setiap kolom (termasuk `trim()` pada judul), menampilkan pesan per kolom, dan menahan tombol submit setelah percobaan yang tidak valid.
- Konten dari input tidak disisipkan dengan `innerHTML`.

## Referensi Sheet A.2

| Area halaman | Selector | Diisi dengan | Variabel di `dom.js` |
| --- | --- | --- | --- |
| Daftar proyek | `#kartu-proyek` | Kartu dari `daftarProyek` | `projectContainer` |
| Baris tombol filter | `#filter` | Tombol kategori | `filterRow` |
| Pesan daftar kosong | `#pesan-kosong` | Pesan ketika tidak ada hasil | `emptyMessage` |
| Form | `#form-catatan` | Validasi judul, kategori, dan rating | `noteForm` |
| Kolom judul | `#judul-karya` | Nama construct atau catatan misi | `titleInput` |
| Kolom kategori | `#jenis-karya` | Kategori arsip | `categoryInput` |
| Kolom rating | `#rating` | Rating pribadi | `ratingInput` |

## Deklarasi bantuan AI

AI membantu menyusun pemisahan modul `app.js` dan `dom.js`, rendering kartu dari data, filter kategori, validasi form, dan dokumentasi Meeting 9. Tema Punishing: Gray Raven dan halaman awal berasal dari proyek pribadi Meeting 6; data profil dan proyek mengacu pada proyek Meeting 8. Saya perlu meninjau kode ini dan memastikan saya dapat menjelaskan setiap bagian sebelum mengumpulkannya.
