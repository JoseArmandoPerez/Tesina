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
    const result = await sql.query`SELECT * FROM empleados WHERE id = ${id} AND codigo = ${codigo}`;
    
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


// Inicia el servidor
const port = process.env.PORT || 3000;
app.listen(port, 'localhost', () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
