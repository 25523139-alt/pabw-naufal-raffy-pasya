// Data that fills the profile. Edit these values here, not in the HTML.
const profil = {
  nama: "Naufal Raffy Pasya",
  nim: "25523139",
  kelas: "C",
  peran: "Mahasiswa Informatika",
  minat: "Saya membuat arsip pribadi bertema Punishing: Gray Raven.",
  keahlian: ["HTML5", "CSS", "Bootstrap 5", "Responsive mobile-first"],
};

// Each entry represents one web project in the course portfolio.
const daftarProyek = [
  {
    judul: "Profil Novel dan Anime",
    tahun: 2026,
    kategori: "P3 · HTML5",
    status: "Selesai",
    selesai: true,
    deskripsi: "Halaman profil untuk mencatat bacaan novel, fanfiction, dan anime favorit.",
  },
  {
    judul: "Design Token Profil",
    tahun: 2026,
    kategori: "P4 · CSS",
    status: "Selesai",
    selesai: true,
    deskripsi: "Token warna dan tema gelap untuk halaman profil hobi.",
  },
  {
    judul: "Arsip Komandan Gray Raven",
    tahun: 2026,
    kategori: "P6 · Responsive web",
    status: "Selesai",
    selesai: true,
    deskripsi: "Arsip pribadi Punishing: Gray Raven yang memakai Bootstrap dan tata letak responsif.",
  },
  {
    judul: "Profil dengan JavaScript ES6+",
    tahun: 2026,
    kategori: "P8 · JavaScript",
    status: "Dalam pengerjaan",
    selesai: false,
    deskripsi: "Data profil dan daftar proyek ditampilkan dari object serta array JavaScript.",
  },
];

const jumlahProyek = daftarProyek.length;
const kota = profil.alamat?.kota ?? "Belum dicantumkan";
const judulInput = document.querySelector("#judul-karya")?.value ?? "";

// Pure function: the output depends only on the object passed as its argument.
function buatPerkenalan({ nama, peran }) {
  return `Nama saya ${nama}, saya ${peran}.`;
}

// Pure function: it returns formatted text and does not change the input array.
const formatKeahlian = (daftar) => daftar.join(" · ");

// DOM helper: this function updates the page, so it is intentionally not pure.
function isiTeks(selector, nilai) {
  const elemen = document.querySelector(selector);
  if (elemen === null) {
    console.error(`Elemen ${selector} tidak ditemukan. Periksa id di profil.html.`);
    return;
  }
  elemen.textContent = nilai;
}

isiTeks("#judul-dokumen", `GRAY RAVEN — Profil ${profil.nama}`);
isiTeks("#perkenalan", buatPerkenalan(profil));
isiTeks("#ringkasan-profil", profil.minat);
isiTeks("#domisili", `Domisili: ${kota}`);
isiTeks("#jumlah-proyek", `Jumlah proyek: ${jumlahProyek}`);
isiTeks("#identitas-footer", `${profil.nama} · NIM ${profil.nim} · Kelas ${profil.kelas} · 2026`);

document.querySelector('meta[name="description"]')?.setAttribute(
  "content",
  `Profil ${profil.nama}, ${profil.peran}. ${profil.minat}`,
);

const daftarKeahlian = document.querySelector("#daftar-keahlian");
if (daftarKeahlian === null) {
  console.error("Elemen #daftar-keahlian tidak ditemukan.");
} else {
  for (let indeks = 0; indeks < profil.keahlian.length; indeks += 1) {
    const item = document.createElement("li");
    item.className = "rounded-0";
    item.textContent = profil.keahlian[indeks];
    daftarKeahlian.append(item);
  }
}

const kartuProyek = document.querySelector("#kartu-proyek");
if (kartuProyek === null) {
  console.error("Elemen #kartu-proyek tidak ditemukan.");
} else {
  for (const [indeks, proyek] of daftarProyek.entries()) {
    const kartu = document.createElement("article");
    kartu.className = "archive-card project-card";

    const nomor = document.createElement("span");
    nomor.className = "card-number";
    nomor.textContent = `PROJECT / ${String(indeks + 1).padStart(2, "0")}`;

    const garis = document.createElement("div");
    garis.className = "card-rule";

    const judul = document.createElement("h3");
    judul.textContent = proyek.judul;

    const deskripsi = document.createElement("p");
    deskripsi.textContent = proyek.deskripsi;

    const kategori = document.createElement("span");
    kategori.className = "card-tag";
    kategori.textContent = `${proyek.kategori} / ${proyek.tahun} / ${proyek.status}`;

    kartu.append(nomor, garis, judul, deskripsi, kategori);
    kartuProyek.append(kartu);
  }
}

const profilSalinan = { ...profil };
const judulProyek = daftarProyek.map((proyek) => proyek.judul);
const proyekSelesai = daftarProyek.filter((proyek) => proyek.selesai === true);
const proyekP6 = daftarProyek.find((proyek) => proyek.judul === "Arsip Komandan Gray Raven");
const proyekTerurut = [...daftarProyek].sort((a, b) => a.judul.localeCompare(b.judul, "id"));
const ratingInput = document.querySelector("#rating")?.value ?? "";
const ratingAngka = ratingInput === "" ? null : Number(ratingInput);

console.log(buatPerkenalan(profil));
console.log(formatKeahlian(profil.keahlian));
console.log("Jenis nama:", typeof profil.nama);
console.log("Jumlah proyek:", typeof jumlahProyek, jumlahProyek);
console.log("Judul input:", judulInput === "" ? "Belum diisi" : judulInput);
console.log("Rating sebagai angka:", ratingAngka);
console.log("Salinan object tingkat atas independen:", profilSalinan !== profil);
console.table(profil.keahlian.map((keahlian) => ({ keahlian })));
console.table(daftarProyek);
console.table(proyekSelesai);
console.table(judulProyek.map((judul) => ({ judul })));
console.log("Proyek P6 ditemukan:", proyekP6);
console.log("Urutan judul pada salinan:", proyekTerurut.map((proyek) => proyek.judul));

const themeToggle = document.querySelector("#themeToggle");
themeToggle?.addEventListener("click", () => {
  const lightMode = document.body.classList.toggle("theme-light");
  themeToggle.setAttribute("aria-pressed", String(lightMode));
  themeToggle.textContent = lightMode ? "Mode gelap" : "Mode terang";
});
