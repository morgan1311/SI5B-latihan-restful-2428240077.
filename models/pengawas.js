let pengawas = [
  { id: 1, nama: 'Nur Rachmat, M.Kom.', nip: '0210088501', prodiId: 1 },
];
let nextId = 2;

function getAll(prodiId) {
  if (prodiId) return pengawas.filter((d) => d.prodiId === prodiId);
  return pengawas;
}

function getById(id) {
  return pengawas.find((d) => d.id === id);
}

function create(data) {
  const baru = { id: nextId++, ...data };
  pengawas.push(baru);
  return baru;
}

module.exports = { getAll, getById, create };