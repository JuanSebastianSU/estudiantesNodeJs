function errorHandler(err, req, res, next) {
  
  if (err?.name === 'SequelizeUniqueConstraintError') {
 
    const fields = err.errors?.map(e => e.path).filter(Boolean);
    const msg = fields?.length ? `Duplicado en campo(s): ${fields.join(', ')}` : 'Registro duplicado';
    return res.status(409).json({ error: msg });
  }


  if (err?.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({ error: 'Referencia inexistente (FK)' });
  }


  console.error('ERROR:', err);
  return res.status(500).json({ error: 'Error interno' });
}

module.exports = { errorHandler };
