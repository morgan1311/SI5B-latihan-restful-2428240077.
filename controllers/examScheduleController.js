// controllers/examScheduleController.js
const ExamScheduleModel = require('../models/examScheduleModel');

const ExamScheduleController = {
  // GET /exam-schedules dan filter ?ruang=nilai
  getAll: (req, res) => {
    const { ruang } = req.query;
    const data = ExamScheduleModel.findAll(ruang);
    // Response GET mengembalikan array data langsung (status 200)
    return res.status(200).json(data);
  },

  // GET /exam-schedules/:id
  getById: (req, res) => {
    const id = parseInt(req.params.id);
    const data = ExamScheduleModel.findById(id);

    if (!data) {
      return res.status(404).json({
        status: "error",
        message: `Data dengan id ${id} tidak ditemukan`,
        data: null
      });
    }

    // Response GET satu data mengembalikan objek langsung (status 200)
    return res.status(200).json(data);
  },

  // POST /exam-schedules
  create: (req, res) => {
    const { mataKuliah, tanggal, jamMulai, ruang, pengawas } = req.body;

    // Validasi field wajib (*)
    if (!mataKuliah || !tanggal || !jamMulai || !ruang) {
      return res.status(400).json({
        status: "error",
        message: "Field mataKuliah, tanggal, jamMulai, dan ruang wajib diisi",
        data: null
      });
    }

    const baru = ExamScheduleModel.create({
      mataKuliah,
      tanggal,
      jamMulai,
      ruang,
      pengawas
    });

    return res.status(201).json({
      status: "success",
      message: "Data berhasil ditambahkan",
      data: baru
    });
  },

  // PUT /exam-schedules/:id
  update: (req, res) => {
    const id = parseInt(req.params.id);
    const { mataKuliah, tanggal, jamMulai, ruang, pengawas } = req.body;

    // Cek keberadaan data terlebih dahulu
    const existing = ExamScheduleModel.findById(id);
    if (!existing) {
      return res.status(404).json({
        status: "error",
        message: `Data dengan id ${id} tidak ditemukan`,
        data: null
      });
    }

    // Validasi seluruh field wajib (penggantian penuh)
    if (!mataKuliah || !tanggal || !jamMulai || !ruang) {
      return res.status(400).json({
        status: "error",
        message: "Field mataKuliah, tanggal, jamMulai, dan ruang wajib diisi",
        data: null
      });
    }

    const updated = ExamScheduleModel.update(id, {
      mataKuliah,
      tanggal,
      jamMulai,
      ruang,
      pengawas
    });

    return res.status(200).json({
      status: "success",
      message: "Data berhasil diperbarui",
      data: updated
    });
  },

  // DELETE /exam-schedules/:id
  delete: (req, res) => {
    const id = parseInt(req.params.id);
    const berhasil = ExamScheduleModel.delete(id);

    if (!berhasil) {
      return res.status(404).json({
        status: "error",
        message: `Data dengan id ${id} tidak ditemukan`,
        data: null
      });
    }

    return res.status(200).json({
      status: "success",
      message: `Data jadwal ujian dengan id ${id} berhasil dihapus`,
      data: null
    });
  }
};

module.exports = ExamScheduleController;
