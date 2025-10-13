const express = require('express');
const cors = require('cors');
const { PORT } = require('./config');
const { sequelize } = require('./models');

const authRoutes = require('./routes/auth.routes');
const estudiantesRoutes = require('./routes/estudiantes.routes');
const cursosRoutes = require('./routes/cursos.routes');
const profesoresRoutes = require('./routes/profesores.routes');
const aulasRoutes = require('./routes/aulas.routes');
const matriculasRoutes = require('./routes/matriculas.routes');
const asignacionesRoutes = require('./routes/asignaciones.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ ok: true, msg: 'Estudiantes API v1 (PostgreSQL)' }));

app.use('/auth', authRoutes);
app.use('/estudiantes', estudiantesRoutes);
app.use('/cursos', cursosRoutes);
app.use('/profesores', profesoresRoutes);
app.use('/aulas', aulasRoutes);
app.use('/matriculas', matriculasRoutes);
app.use('/asignaciones', asignacionesRoutes);
app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
  } catch (e) {
    console.error('Error iniciando la app:', e);
    process.exit(1);
  }
})();

