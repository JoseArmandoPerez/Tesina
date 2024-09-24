const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configura la conexión a SQL Server
const config = {
    user: 'sa',
    password: 'tesina2024',
    server: '172.16.134.107', // Dirección IP del servidor SQL
    port: 4500, // Especifica el puerto aquí, si no usas el puerto predeterminado
    database: 'hola', // Reemplaza con tu base de datos
    options: {
        encrypt: true, // Usar true si estás en Azure
        trustServerCertificate: true, // Cambia a 'false' en producción si tienes un certificado válido
        instanceName: 'SQLEXPRESS' // Especifica el nombre de la instancia
    }
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


// Inicia el servidor
const port = process.env.PORT || 3000;
app.listen(port, '172.16.134.107', () => {
  console.log(`Servidor corriendo en http://172.16.134.107:${port}`);
});
