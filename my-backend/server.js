const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configura la conexión a SQL Server
const config = {
  user: "sa",
  password: "12345",
  server: "localhost",
  database: "app",
  options: {
      encrypt: false,
      trustServerCertificate: true,
  },
};

// Ruta para la raíz del servidor
app.get('/', (req, res) => {
    res.send('Servidor Express está funcionando correctamente');
});

app.get('/api/empleados', async (req, res) => {
  const { id, codigo } = req.query;

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Usuario WHERE id_estudiante = ${id} AND  password = ${codigo}`;
    
    if (result.recordset.length > 0) {
      res.send(result.recordset[0]);
    } else {
      res.status(404).send({ message: 'Usuario no encontrado' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Ruta para obtener las rutas de los conductores
app.get('/api/rutas', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query`
      SELECT latitud, longitud, id_conductor
      FROM rutas
      ORDER BY id_conductor, id`;
    
    const rutas = result.recordset;
    if (rutas.length > 0) {
      res.send(rutas);
    } else {
      res.status(404).send({ message: 'No se encontraron rutas' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});


// Nueva Ruta para registrar usuarios
app.post('/api/usuarios', async (req, res) => {
  const {
    id_estudiante,
    nombre,
    apellido,
    carrera,
    direccion,
    semestre,
    password,
    foto_perfil_url,
    datos_biometricos,
  } = req.body;

  try {
    await sql.connect(config);
    const fechaIngreso = new Date().toISOString().slice(0, 10); // Formato YYYY-MM-DD

    const request = new sql.Request();
    request.input('id_estudiante', sql.BigInt, id_estudiante);
    request.input('nombre', sql.Text, nombre);
    request.input('apellido', sql.Text, apellido);
    request.input('carrera', sql.Text, carrera);
    request.input('direccion', sql.Text, direccion);
    request.input('semestre', sql.Text, semestre);
    request.input('password', sql.VarChar(255), password);
    request.input('fecha_ingreso', sql.Date, fechaIngreso);
    request.input('foto_perfil_url', sql.Text, foto_perfil_url);
    request.input('datos_biometricos', sql.Text, datos_biometricos);

    const insertQuery = `
      INSERT INTO Usuario (
        id_estudiante, nombre, apellido, carrera, direccion, semestre, password, fecha_ingreso, foto_perfil_url, datos_biometricos
      )
      VALUES (
        @id_estudiante, @nombre, @apellido, @carrera, @direccion, @semestre, @password, @fecha_ingreso, @foto_perfil_url, @datos_biometricos
      )
      SELECT SCOPE_IDENTITY() AS id_usuario
    `;

    const result = await request.query(insertQuery);
    const insertedId = result.recordset[0].id_usuario;

    res.status(201).send({ message: 'Usuario registrado exitosamente', id_usuario: insertedId });
  } catch (err) {
    console.error('Error al registrar usuario:', err);
    res.status(500).send({ message: 'Error al registrar usuario', error: err.message });
  }
});


// Inicia el servidor
const port = process.env.PORT || 3000;
app.listen(port, 'localhost', () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
