 const http = require('http');

const newUser = JSON.stringify({
  name: "Juan",
  email: "juan@example.com",
  location: "Buenos Aires",
  password: "miContraseñaSegura"
});

// Opciones para la solicitud
const options = {
  hostname: 'localhost',
  port: 3000, // Cambia esto si usas otro puerto
  path: '/users',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(newUser),

  },
};

// Crear la solicitud
const req = http.request(options, (res) => {
  let data = '';

  // Recibir la respuesta
  res.on('data', (chunk) => {
    data += chunk;
  });

  // Al finalizar la respuesta
  res.on('end', () => {
    console.log('Respuesta:', data);
  });
});

// Manejar errores
req.on('error', (error) => {
  console.error('Error:', error);
});

// Enviar el cuerpo de la solicitud
req.write(newUser);
req.end();
