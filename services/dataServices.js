 const fs = require('fs');

// Leer datos del archivo de forma asíncrona
const readData = (callback) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      return;
    }
    callback(JSON.parse(data));
  });
};

// Escribir datos en el archivo de forma asíncrona
const writeData = (data) => {
  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Error al escribir en el archivo:', err);
    }
  });
};

// Exportar las funciones para que puedan ser usadas en otros archivos
module.exports = { readData, writeData };
