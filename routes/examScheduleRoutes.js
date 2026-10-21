// routes/examScheduleRoutes.js
const express = require('express');
const router = express.Router();
const ExamScheduleController = require('../controllers/examScheduleController');

// 1. GET semua data atau filter query ?ruang=...
router.get('/', ExamScheduleController.getAll);

// 2. GET detail data berdasarkan ID
router.get('/:id', ExamScheduleController.getById);

// 3. POST tambah data baru
router.post('/', ExamScheduleController.create);

// 4. PUT update data penuh
router.put('/:id', ExamScheduleController.update);

// 5. DELETE hapus data
router.delete('/:id', ExamScheduleController.delete);

module.exports = router;
