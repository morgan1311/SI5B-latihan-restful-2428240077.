// models/examScheduleModel.js

// Array data awal di memori (minimal 3 data)
let examSchedules = [
  {
    id: 1,
    mataKuliah: "Pemrograman Web",
    tanggal: "2026-11-02",
    jamMulai: "08:00",
    ruang: "B-204",
    pengawas: "Dewi Anggraini, M.Kom"
  },
  {
    id: 2,
    mataKuliah: "Basis Data Lanjut",
    tanggal: "2026-11-03",
    jamMulai: "10:00",
    ruang: "Lab-Komputer-1",
    pengawas: "Budi Santoso, M.T."
  },
  {
    id: 3,
    mataKuliah: "Rekayasa Perangkat Lunak",
    tanggal: "2026-11-04",
    jamMulai: "13:00",
    ruang: "B-204",
    pengawas: "Siti Rahma, M.Cs."
  }
];

let nextId = 4;

const ExamScheduleModel = {
  // Ambil semua data atau filter berdasarkan ruang kelas
  findAll: (ruang) => {
    if (ruang) {
      return examSchedules.filter(
        (item) => item.ruang.toLowerCase() === ruang.toLowerCase()
      );
    }
    return examSchedules;
  },

  // Cari satu data berdasarkan ID
  findById: (id) => {
    return examSchedules.find((item) => item.id === id);
  },

  // Tambah data baru
  create: (data) => {
    const baru = {
      id: nextId++,
      mataKuliah: data.mataKuliah,
      tanggal: data.tanggal,
      jamMulai: data.jamMulai,
      ruang: data.ruang,
      pengawas: data.pengawas || "-"
    };
    examSchedules.push(baru);
    return baru;
  },

  // Perbarui data secara penuh berdasarkan ID
  update: (id, data) => {
    const index = examSchedules.findIndex((item) => item.id === id);
    if (index === -1) return null;

    examSchedules[index] = {
      id: id,
      mataKuliah: data.mataKuliah,
      tanggal: data.tanggal,
      jamMulai: data.jamMulai,
      ruang: data.ruang,
      pengawas: data.pengawas || "-"
    };
    return examSchedules[index];
  },

  // Hapus data berdasarkan ID
  delete: (id) => {
    const index = examSchedules.findIndex((item) => item.id === id);
    if (index === -1) return false;

    examSchedules.splice(index, 1);
    return true;
  }
};

module.exports = ExamScheduleModel;
