# API CRUD de Estudiantes con Node.js y PostgreSQL

Este proyecto proporciona una API RESTful para gestionar estudiantes, utilizando **Express.js** para el servidor y **PostgreSQL** como base de datos.

# Endpoints de la API

La API permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los estudiantes. Los estudiantes se almacenan en una base de datos PostgreSQL.

### 1. **GET /estudiantes**
Obtiene todos los estudiantes almacenados en la base de datos.

*Respuesta exitosa:*
- *Código:** 200
- *Cuerpo de la respuesta:*
  ```json
  [
    {
      "id": 1,
      "nombre": "Juan Pérez",
      "edad": 20
    },
    {
      "id": 2,
      "nombre": "Ana Gómez",
      "edad": 22
    }
  ]
2. GET /estudiantes/:id
Obtiene un estudiante específico por su ID.

Parámetros:

id: El ID del estudiante que se quiere obtener.

Respuesta exitosa:

Código: 200

Cuerpo de la respuesta:

json
Copiar código
{
  "id": 1,
  "nombre": "Juan Pérez",
  "edad": 20
}
Respuestas de error:

Código: 404

Cuerpo de la respuesta:

json
Copiar código
{
  "mensaje": "Estudiante no encontrado"
}
3. POST /estudiantes
Crea un nuevo estudiante.

Cuerpo de la solicitud:

nombre: El nombre del estudiante (string).

edad: La edad del estudiante (número).

Ejemplo de solicitud:

json
Copiar código
{
  "nombre": "Carlos Sánchez",
  "edad": 23
}
Respuesta exitosa:

Código: 201

Cuerpo de la respuesta:

json
Copiar código
{
  "id": 3,
  "nombre": "Carlos Sánchez",
  "edad": 23
}
4. PUT /estudiantes/:id
Actualiza completamente un estudiante por su ID.

Parámetros:

id: El ID del estudiante que se quiere actualizar.

Cuerpo de la solicitud:

nombre: El nuevo nombre del estudiante (string).

edad: La nueva edad del estudiante (número).

Ejemplo de solicitud:

json
Copiar código
{
  "nombre": "Carlos Sánchez",
  "edad": 24
}
Respuesta exitosa:

Código: 200

Cuerpo de la respuesta:

json
Copiar código
{
  "id": 3,
  "nombre": "Carlos Sánchez",
  "edad": 24
}
Respuestas de error:

Código: 404

Cuerpo de la respuesta:

json
Copiar código
{
  "mensaje": "Estudiante no encontrado"
}
5. PATCH /estudiantes/:id
Actualiza parcialmente un estudiante por su ID (solo los campos que se proporcionen).

Parámetros:

id: El ID del estudiante que se quiere actualizar.

Cuerpo de la solicitud:

nombre: El nuevo nombre del estudiante (opcional).

edad: La nueva edad del estudiante (opcional).

Ejemplo de solicitud (solo actualiza la edad):

json
Copiar código
{
  "edad": 25
}
Respuesta exitosa:

Código: 200

Cuerpo de la respuesta:

json
Copiar código
{
  "id": 3,
  "nombre": "Carlos Sánchez",
  "edad": 25
}
Respuestas de error:

Código: 404

Cuerpo de la respuesta:

json
Copiar código
{
  "mensaje": "Estudiante no encontrado"
}
6. DELETE /estudiantes/:id
Elimina un estudiante por su ID.

Parámetros:

id: El ID del estudiante que se quiere eliminar.

Respuestas de error:

Código: 404

Cuerpo de la respuesta:

json
Copiar código
{
  "mensaje": "Estudiante no encontrado"
}
Respuesta exitosa:

Código: 204

Cuerpo de la respuesta: No hay cuerpo en la respuesta, solo el código 204.

Instalación
Sigue los pasos a continuación para instalar y ejecutar el proyecto localmente:

1. Clona el repositorio:
bash
Copiar código
git clone https://github.com/TuUsuario/estudiantes-api.git
2. Instala las dependencias:
En la carpeta raíz del proyecto, instala las dependencias ejecutando el siguiente comando:

bash
Copiar código
npm install
3. Configura la base de datos
Asegúrate de tener PostgreSQL instalado y en ejecución. Crea una base de datos llamada estudiantesNodeJs o ajusta la configuración de conexión en el archivo index.js para adaptarlo a tu base de datos.

4. Corre el servidor:
Ejecuta el siguiente comando para iniciar el servidor:

bash
Copiar código
node index.js
El servidor estará disponible en http://localhost:3000.
