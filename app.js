// ============================================================
// Tugas 1: RESTful API Murni dengan Express.js
// Topik 17 : Kampus - Jadwal Ujian
// Resource : /exam-schedules
// ============================================================

// 1. Impor Express
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// 2. Middleware untuk membaca body berformat JSON
app.use(express.json());

// 3. Array data awal di memori (minimal 3 data) & ID auto-increment
let nextId = 4;
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

// 4. Route Root (GET /) - Informasi API berformat JSON
app.get('/', (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Selamat datang di API Jadwal Ujian",
    documentation: {
      resource: "/exam-schedules",
      endpoints: [
        { method: "GET", path: "/exam-schedules", description: "Mendapatkan semua jadwal ujian atau filter ?ruang=" },
        { method: "GET", path: "/exam-schedules/:id", description: "Mendapatkan satu jadwal ujian berdasarkan ID" },
        { method: "POST", path: "/exam-schedules", description: "Menambahkan jadwal ujian baru" },
        { method: "PUT", path: "/exam-schedules/:id", description: "Memperbarui data jadwal ujian" },
        { method: "DELETE", path: "/exam-schedules/:id", description: "Menghapus jadwal ujian" }
      ]
    }
  });
});

// 5. GET /exam-schedules & Filter Query String (?ruang=nilai)
app.get('/exam-schedules', (req, res) => {
  const { ruang } = req.query;

  // Jika terdapat query string ?ruang=...
  if (ruang) {
    const hasilFilter = examSchedules.filter(
      (item) => item.ruang.toLowerCase() === ruang.toLowerCase()
    );
    return res.status(200).json(hasilFilter);
  }

  // Jika tanpa query, kembalikan semua data
  res.status(200).json(examSchedules);
});

// 6. GET /exam-schedules/:id - Mengambil satu data berdasarkan ID
app.get('/exam-schedules/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = examSchedules.find((item) => item.id === id);

  if (!data) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null
    });
  }

  res.status(200).json(data);
});

// 7. POST /exam-schedules - Menambah data baru
// Body wajib: mataKuliah, tanggal, jamMulai, ruang (pengawas bersifat opsional)
app.post('/exam-schedules', (req, res) => {
  const { mataKuliah, tanggal, jamMulai, ruang, pengawas } = req.body;

  // Validasi semua field wajib
  if (!mataKuliah || !tanggal || !jamMulai || !ruang) {
    return res.status(400).json({
      status: "error",
      message: "Field mataKuliah, tanggal, jamMulai, dan ruang wajib diisi",
      data: null
    });
  }

  const baru = {
    id: nextId++,
    mataKuliah,
    tanggal,
    jamMulai,
    ruang,
    pengawas: pengawas || "-"
  };

  examSchedules.push(baru);

  res.status(201).json({
    status: "success",
    message: "Data berhasil ditambahkan",
    data: baru
  });
});

// 8. PUT /exam-schedules/:id - Mengubah seluruh data (penggantian penuh)
app.put('/exam-schedules/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = examSchedules.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null
    });
  }

  const { mataKuliah, tanggal, jamMulai, ruang, pengawas } = req.body;

  // Validasi seluruh field wajib untuk penggantian penuh
  if (!mataKuliah || !tanggal || !jamMulai || !ruang) {
    return res.status(400).json({
      status: "error",
      message: "Field mataKuliah, tanggal, jamMulai, dan ruang wajib diisi",
      data: null
    });
  }

  examSchedules[index] = {
    id: id,
    mataKuliah,
    tanggal,
    jamMulai,
    ruang,
    pengawas: pengawas || "-"
  };

  res.status(200).json({
    status: "success",
    message: "Data berhasil diperbarui",
    data: examSchedules[index]
  });
});

// 9. DELETE /exam-schedules/:id - Menghapus data
app.delete('/exam-schedules/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = examSchedules.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null
    });
  }

  examSchedules.splice(index, 1);

  res.status(200).json({
    status: "success",
    message: `Data dengan id ${id} berhasil dihapus`,
    data: null
  });
});

// 10. Catch-all middleware untuk route yang tidak terdaftar (404 JSON)
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint tidak ditemukan",
    data: null
  });
});

// 11. Menjalankan server secara lokal
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

// 12. Ekspor app untuk deployment serverless di Vercel
module.exports = app;