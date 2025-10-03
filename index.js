const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres',          
  host: 'localhost',         
  database: 'estudiantesNodeJs',
  password: 'postgres', 
  port: 5432,                
});

const crearTabla = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS estudiantes (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100),
      edad INTEGER
    )
  `);
};
crearTabla();

app.get('/estudiantes', async (req, res) => {
  const result = await pool.query('SELECT * FROM estudiantes ORDER BY id');
  res.status(200).json(result.rows);
});

app.get('/estudiantes/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM estudiantes WHERE id = $1', [id]);
  if (result.rows.length === 0) return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
  res.status(200).json(result.rows[0]);
});

app.post('/estudiantes', async (req, res) => {
  const { nombre, edad } = req.body;
  const result = await pool.query(
    'INSERT INTO estudiantes (nombre, edad) VALUES ($1, $2) RETURNING *',
    [nombre, edad]
  );
  res.status(201).json(result.rows[0]);
});

app.put('/estudiantes/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, edad } = req.body;
  const result = await pool.query(
    'UPDATE estudiantes SET nombre = $1, edad = $2 WHERE id = $3 RETURNING *',
    [nombre, edad, id]
  );
  if (result.rows.length === 0) return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
  res.status(200).json(result.rows[0]);
});

app.patch('/estudiantes/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, edad } = req.body;
  // Recuperar el estudiante
  const estudiante = await pool.query('SELECT * FROM estudiantes WHERE id = $1', [id]);
  if (estudiante.rows.length === 0) return res.status(404).json({ mensaje: 'Estudiante no encontrado' });

  const nuevoNombre = nombre || estudiante.rows[0].nombre;
  const nuevaEdad = edad || estudiante.rows[0].edad;

  const result = await pool.query(
    'UPDATE estudiantes SET nombre = $1, edad = $2 WHERE id = $3 RETURNING *',
    [nuevoNombre, nuevaEdad, id]
  );
  res.status(200).json(result.rows[0]);
});

app.delete('/estudiantes/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('DELETE FROM estudiantes WHERE id = $1 RETURNING *', [id]);
  if (result.rows.length === 0) return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
  res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
