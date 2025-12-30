 // Array para almacenar las mascotas
const pets = [];

// Función para agregar una nueva mascota
const addPet = (pet) => {
  pet.id = String(pets.length + 1); // Asignar un id único como string
  pets.push(pet);
};

// Función para obtener todas las mascotas
const getPets = () => {
  return pets;
};

// Función para actualizar una mascota
const updatePet = (id, updatedData) => {
  const index = pets.findIndex(pet => pet.id === id); // Buscamos la mascota por ID
  if (index !== -1) {
    pets[index] = { ...pets[index], ...updatedData }; // Actualizamos los datos de la mascota
    return true; // Retornamos true si se actualizó
  }
  return false; // Retornamos false si no se encontró
};

// Función para eliminar una mascota
const deletePet = (id) => {
  const index = pets.findIndex(pet => pet.id === id); // Buscamos la mascota por ID
  if (index !== -1) {
    pets.splice(index, 1); // Eliminamos la mascota del array
    return true; // Retornamos true si se eliminó
  }
  return false; // Retornamos false si no se encontró
};

// Exportar las funciones
module.exports = {
  addPet,
  getPets,
  updatePet,
  deletePet, // Asegúrate de exportar la función
};
