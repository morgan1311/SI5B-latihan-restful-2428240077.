let jamMulai = [
  { id : 1, jamMulai: '07:50 - 09:00' },
  { id : 2, jamMulai: '09:30 - 11:00' },
];
let nextId = 3;

function getAll() {
  return jamMulai;
}

function getById(id) {
  return jamMulai.find((j) => j.id === id);
}

function create(data) {
  const baru = { id: nextId++, ...data };
  jamMulai.push(baru);
  return baru;
}

module.exports = { getAll, getById, create };