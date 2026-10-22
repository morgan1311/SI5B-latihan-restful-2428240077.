let mataKuliah = [
  { id: 1, nama: 'Pengantar Sistem Informasi', jamMulaiId: 1 },
  { id: 2, nama: 'Pengembangan Aplikasi Web 2', jamMulaiId: 2 },
];
let nextId = 3;

function getAll(jamMulaiId) {
  if (jamMulaiId) return mataKuliah.filter((p) => p.jamMulaiId === jamMulaiId);
  return mataKuliah;
}

function getById(id) {
  return mataKuliah.find((p) => p.id === id);
}

function create(data) {
  const baru = { id: nextId++, ...data };
  prodi.push(baru);
  return baru;
}

module.exports = { getAll, getById, create };