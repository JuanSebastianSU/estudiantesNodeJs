Estudiantes API — Node.js + Express + PostgreSQL + Sequelize + JWT

API REST para gestionar estudiantes, cursos, profesores, aulas, matrículas y asignaciones (curso ↔ profesor ↔ aula), con autenticación JWT, roles (admin, docente, asistente, invitado), ownership (cada usuario solo actualiza lo que creó) y reglas anti-duplicados con códigos 409.

Se usaron las tecnologías:

Node.js: entorno de ejecución rápido, gran ecosistema NPM y fácil de desplegar.

Express: framework minimalista para crear APIs REST de forma clara y flexible.

PostgreSQL: base de datos SQL robusta, con buen soporte para constraints e índices.

Sequelize: ORM para modelar entidades, relaciones y migraciones rápidas (aquí se usa sync).

JWT (jsonwebtoken): autenticación stateless con tokens, ideal para APIs.

bcryptjs: hash de contraseñas seguro.

dotenv: maneja credenciales/variables por entorno.

cors: habilita CORS para clientes externos.

Estructura del proyecto
src/
  components/
  config/
    db.js
    index.js
    roles.js
  controllers/
    aulas.controller.js
    asignaciones.controller.js
    auth.controller.js
    cursos.controller.js
    estudiantes.controller.js
    matriculas.controller.js
    profesores.controller.js
  middleware/
    auth.js
    error-handler.js
  models/
    Aula.js
    Asignacion.js
    Curso.js
    Estudiante.js
    Matricula.js
    Profesor.js
    User.js
    index.js
  routes/
    aulas.routes.js
    asignaciones.routes.js
    auth.routes.js
    cursos.routes.js
    estudiantes.routes.js
    matriculas.routes.js
    profesores.routes.js
  services/
    auth.service.js
    crud.service.js
index.js

Requisitos

Node.js LTS

PostgreSQL (local o remoto)

(Opcional) pgAdmin 4 para administrar la BD

Configuración
1) Clonar e instalar
git clone https://github.com/JuanSebastianSU/estudiantesNodeJs.git
cd estudiantesNodeJs
npm install

2) Variables de entorno

Crea .env:

PORT=3000
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=TU_PASSWORD
PG_DATABASE=estudiante-api   # o estudiante_api
JWT_SECRET=super-secreto-123

3) Base de datos

Crear BD (si usas guion, usa comillas):

CREATE DATABASE "estudiante-api";
-- o recomendado:
CREATE DATABASE estudiante_api;

4) Scripts NPM

En package.json:

"scripts": {
  "dev": "nodemon src/index.js",
  "start": "node src/index.js"
}

5) Levantar
npm run dev
# Servidor en http://localhost:3000


En el arranque, sequelize.sync({ alter: true }) crea/ajusta las tablas según los modelos.

Seguridad y acceso

Autenticación: JWT (login emite { token }).

Autorización por roles: admin, docente, asistente, invitado.

Solo admin puede DELETE en todas las entidades.

PUT/PATCH: admin o dueño (quien creó el recurso) → campo createdBy.

Anti-duplicados: índices/constraints unique en modelos (p. ej., User.email, Curso.nombre, Aula.nombre, etc.).

Errores de duplicado → 409 Conflict por SequelizeUniqueConstraintError.

Manejo de errores: middleware error-handler.js.

Endpoints

Todas las rutas (salvo /auth) requieren header:

Authorization: Bearer <TOKEN>
Content-Type: application/json

0) Auth (público)
POST /auth/register

Crea usuario del sistema.

{
  "email": "admin@colegio.com",
  "password": "123456",
  "role": "admin",
  "nombre": "Admin"
}


201 → datos del usuario (sin password).

POST /auth/login

Devuelve JWT.

{ "email": "admin@colegio.com", "password": "123456" }


200 → { "token": "..." }

1) Estudiantes

GET /estudiantes → lista.

POST /estudiantes → crea (asigna createdBy automáticamente).

{ "nombre": "Juan Pérez", "email": "juan@colegio.com", "edad": 17 }


PUT /estudiantes/:id → admin o dueño.

PATCH /estudiantes/:id → admin o dueño.

DELETE /estudiantes/:id → solo admin.

Unique: email (case-insensitive por normalización).

2) Cursos

GET /cursos

POST /cursos

{ "nombre": "Matemática I", "creditos": 5 }


PUT /cursos/:id → admin o dueño

PATCH /cursos/:id → admin o dueño

DELETE /cursos/:id → solo admin

Unique: nombre.

3) Profesores

GET /profesores

POST /profesores

{ "nombre": "María Gómez", "especialidad": "Física" }


PUT /profesores/:id → admin o dueño

PATCH /profesores/:id → admin o dueño

DELETE /profesores/:id → solo admin

Unique compuesto: nombre + especialidad.

4) Aulas

GET /aulas

POST /aulas

{ "nombre": "Aula B-101", "capacidad": 35 }


PUT /aulas/:id → admin o dueño

PATCH /aulas/:id → admin o dueño

DELETE /aulas/:id → solo admin

Unique: nombre.

5) Matrículas (Estudiante ↔ Curso)

GET /matriculas (incluye Estudiante y Curso)

POST /matriculas

{ "estudianteId": "UUID_EST", "cursoId": "UUID_CUR", "fecha": "2025-10-12" }


PUT /matriculas/:id → admin o dueño

PATCH /matriculas/:id → admin o dueño

DELETE /matriculas/:id → solo admin

Unique compuesto: estudianteId + cursoId.

6) Asignaciones (Curso ↔ Profesor ↔ Aula)

GET /asignaciones (incluye Curso, Profesor, Aula)

POST /asignaciones

{ "cursoId": "UUID_CUR", "profesorId": "UUID_PROF", "aulaId": "UUID_AULA" }


PUT /asignaciones/:id → admin o dueño

PATCH /asignaciones/:id → admin o dueño

DELETE /asignaciones/:id → solo admin

Unique compuesto: cursoId + profesorId + aulaId.

Ejemplos con curl
# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@colegio.com","password":"123456"}'

# Crear curso
curl -X POST http://localhost:3000/cursos \
  -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" \
  -d '{"nombre":"Matemática I","creditos":5}'

# Crear estudiante
curl -X POST http://localhost:3000/estudiantes \
  -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" \
  -d '{"nombre":"Juan Pérez","email":"juan@colegio.com","edad":17}'

# Crear matrícula (reemplaza UUIDs)
curl -X POST http://localhost:3000/matriculas \
  -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" \
  -d '{"estudianteId":"UUID_EST","cursoId":"UUID_CUR","fecha":"2025-10-12"}'

Notas de implementación

Ownership: todos los modelos de dominio incluyen createdBy (UUID de usuario creador).

PUT/PATCH permiten si req.user.role === 'admin' o item.createdBy === req.user.id.

DELETE exige admin.

Anti-duplicados:

User.email único (normalizado a minúsculas).

Estudiante.email único (si se usa).

Curso.nombre único.

Aula.nombre único.

Profesor (nombre + especialidad) único compuesto.

Matricula (estudianteId + cursoId) único compuesto.

Asignacion (cursoId + profesorId + aulaId) único compuesto.

Errores:

Duplicados → 409 Conflict (middleware mapea SequelizeUniqueConstraintError).

FKs inválidas → 400.

No encontrado → 404.

Sin token/rol → 401/403.

Desarrollo y pruebas

Colección Postman / Thunder Client: crear variables para baseUrl y token.