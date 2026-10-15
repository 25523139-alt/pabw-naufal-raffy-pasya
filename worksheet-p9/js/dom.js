import { profil, daftarProyek, buatPerkenalan, kota } from "./app.js";

function pilih(selector) {
  const elemen = document.querySelector(selector);
  if (elemen === null) {
    throw new Error(`Elemen ${selector} tidak ditemukan. Periksa selector dan urutan script.`);
  }
  return elemen;
}

// Referensi elemen halaman. Selector ini dicatat juga pada tabel Sheet A.
const projectContainer = pilih("#kartu-proyek");
const filterRow = pilih("#filter");
const emptyMessage = pilih("#pesan-kosong");
const projectCount = pilih("#jumlah-proyek");
const skillsList = pilih("#daftar-keahlian");
const noteForm = pilih("#form-catatan");
const titleInput = pilih("#judul-karya");
const categoryInput = pilih("#jenis-karya");
const ratingInput = pilih("#rating");
const submitButton = pilih('#form-catatan button[type="submit"]');
const formStatus = pilih("#status-form");
const themeToggle = pilih("#themeToggle");

pilih("#judul-dokumen").textContent = `GRAY RAVEN — Profil ${profil.nama}`;
pilih("#perkenalan").textContent = buatPerkenalan(profil);
pilih("#ringkasan-profil").textContent = profil.minat;
pilih("#domisili").textContent = `Domisili: ${kota}`;
pilih("#identitas-footer").textContent = `${profil.nama} · NIM ${profil.nim} · Kelas ${profil.kelas} · 2026`;
pilih('meta[name="description"]').setAttribute(
  "content",
  `Profil ${profil.nama}, ${profil.peran}. ${profil.minat}`,
);

skillsList.textContent = "";
for (const skill of profil.keahlian) {
  const item = document.createElement("li");
  item.className = "rounded-0";
  item.textContent = skill;
  skillsList.append(item);
}

function buildCard(project, index) {
  const card = document.createElement("article");
  card.className = "archive-card project-card";

  const number = document.createElement("span");
  number.className = "card-number";
  number.textContent = `PROJECT / ${String(index + 1).padStart(2, "0")}`;

  const rule = document.createElement("div");
  rule.className = "card-rule";

  const title = document.createElement("h3");
  title.textContent = project.judul;

  const description = document.createElement("p");
  description.textContent = project.deskripsi;

  const category = document.createElement("span");
  category.className = "card-tag";
  category.textContent = `${project.kategori} / ${project.tahun} / ${project.status}`;

  card.append(number, rule, title, description, category);
  return card;
}

function render(projects) {
  projectContainer.textContent = "";

  if (projects.length === 0) {
    emptyMessage.hidden = false;
    projectCount.textContent = `Tidak ada proyek untuk filter ini. Total data: ${daftarProyek.length}.`;
    return;
  }

  emptyMessage.hidden = true;
  const fragment = document.createDocumentFragment();
  projects.forEach((project, index) => fragment.append(buildCard(project, index)));
  projectContainer.append(fragment);
  projectCount.textContent = `Menampilkan ${projects.length} dari ${daftarProyek.length} proyek.`;
}

const filterButtons = Array.from(filterRow.querySelectorAll("button[data-category]"));
function markActiveButton(activeButton) {
  filterButtons.forEach((button) => {
    const isActive = button === activeButton;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

// Satu listener pada baris filter melayani semua tombol, termasuk saat isi halaman berubah.
filterRow.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  const button = event.target.closest("button[data-category]");
  if (!button || !filterRow.contains(button)) return;

  const category = button.dataset.category;
  const selected = category === "all"
    ? daftarProyek
    : daftarProyek.filter((project) => project.category === category);

  markActiveButton(button);
  render(selected);
});

const allButton = pilih('#filter button[data-category="all"]');
markActiveButton(allButton);
render(daftarProyek);

const titleError = pilih("#error-judul");
const categoryError = pilih("#error-kategori");
const ratingError = pilih("#error-rating");
const fields = [
  {
    input: titleInput,
    error: titleError,
    isValid: () => titleInput.value.trim() !== "",
    message: "Isi nama construct atau catatan misi.",
  },
  {
    input: categoryInput,
    error: categoryError,
    isValid: () => categoryInput.value !== "",
    message: "Pilih kategori arsip.",
  },
  {
    input: ratingInput,
    error: ratingError,
    isValid: () => ratingInput.value !== "",
    message: "Pilih rating pribadi.",
  },
];

let submitAttempted = false;
function syncFormValidity(showErrors = submitAttempted) {
  let firstInvalid = null;

  fields.forEach((field) => {
    const valid = field.isValid();
    if (!valid && firstInvalid === null) firstInvalid = field;

    if (showErrors && !valid) {
      field.error.textContent = field.message;
      field.input.setAttribute("aria-invalid", "true");
    } else {
      field.error.textContent = "";
      field.input.removeAttribute("aria-invalid");
    }
  });

  const valid = firstInvalid === null;
  if (submitAttempted) submitButton.disabled = !valid;
  return { valid, firstInvalid };
}

function handleFieldChange(event) {
  const changedField = fields.find((field) => field.input === event.target);
  if (!changedField) return;
  formStatus.textContent = "";
  syncFormValidity();
}

noteForm.addEventListener("input", handleFieldChange);
noteForm.addEventListener("change", handleFieldChange);
noteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  submitAttempted = true;
  const result = syncFormValidity(true);

  if (!result.valid) {
    result.firstInvalid.input.focus();
    return;
  }

  formStatus.textContent = "Semua kolom valid. Catatan belum dikirim atau disimpan ke server.";
  noteForm.reset();
  submitAttempted = false;
  syncFormValidity(false);
});

themeToggle.addEventListener("click", () => {
  const lightMode = document.body.classList.toggle("theme-light");
  themeToggle.setAttribute("aria-pressed", String(lightMode));
  themeToggle.textContent = lightMode ? "Mode gelap" : "Mode terang";
});

