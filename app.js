 const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer'); // Importar multer
const { registerUser } = require('./controllers/userController');
const { sendEmail } = require('./services/emailService');

const app = express();

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta para guardar imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único
  }
});
const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'frontend')));

// Rutas existentes
app.get('/api/data', (req, res) => {
  const data = readData();
  res.json(data);
});

// Modificamos esta ruta para usar multer y guardar la imagen
app.post('/api/pets', upload.single('image'), (req, res) => {
  const newPet = req.body;
  if (req.file) {
    newPet.imageUrl = req.file.path; // Guardamos la ruta de la imagen
  }
  const data = readData();
  data.pets.push(newPet);
  writeData(data);
  res.status(201).json(newPet);
});

// Ruta para registrar usuarios
app.post('/register', registerUser);

// Ruta para reportar mascotas
app.post('/reportar', (req, res) => {
  const { email, nombreMascota, estado, ubicacion } = req.body; // Asegúrate de que estos datos se envíen en el body

  // Enviar la notificación
  const asunto = `Reporte de Mascota: ${nombreMascota}`;
  const mensaje = `<h1>Se ha reportado una mascota</h1>
                   <p>Nombre: ${nombreMascota}</p>
                   <p>Estado: ${estado}</p>
                   <p>Ubicación: ${ubicacion}</p>`;

  sendEmail(email, asunto, mensaje); // Usá la función que ya tenés para enviar el email

  res.send('Reporte de mascota enviado y notificación enviada por email');
});

// Ruta para probar el envío de email
app.get('/test-email', (req, res) => {
  sendEmail('usuario@example.com', 'Prueba', 'Este es un email simulado');
  res.send('Email simulado enviado, revisa la consola.');
});

// Funciones para leer y escribir datos
function readData() {
  const data = fs.readFileSync('data.json', 'utf8');
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
