// ============================================================
// Tugas 1: RESTful API Murni dengan Express.js (Arsitektur MVC)
// Topik 17 : Kampus - Jadwal Ujian
// Resource : /exam-schedules
// ============================================================

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Impor router
const examScheduleRoutes = require('./routes/examScheduleRoutes');

// Middleware parsing JSON
app.use(express.json());

// 1. Route Root (GET /) - Info API berformat JSON murni
app.get('/', (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Selamat datang di API Jadwal Ujian (Topik 17)",
    documentation: {
      resource: "/exam-schedules",
      endpoints: [
        { method: "GET", path: "/exam-schedules", description: "Mengambil semua jadwal ujian atau filter ?ruang=nilai" },
        { method: "GET", path: "/exam-schedules/:id", description: "Mengambil detail jadwal ujian berdasarkan ID" },
        { method: "POST", path: "/exam-schedules", description: "Menambahkan jadwal ujian baru" },
        { method: "PUT", path: "/exam-schedules/:id", description: "Memperbarui jadwal ujian secara penuh" },
        { method: "DELETE", path: "/exam-schedules/:id", description: "Menghapus jadwal ujian" }
      ]
    }
  });
});

// 2. Hubungkan router Jadwal Ujian
app.use('/exam-schedules', examScheduleRoutes);

// 3. Catch-all middleware untuk route yang tidak terdaftar (404 JSON)
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint tidak ditemukan",
    data: null
  });
});

// 4. Menjalankan server secara lokal
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

// 5. Ekspor app untuk deployment Vercel
module.exports = app;
