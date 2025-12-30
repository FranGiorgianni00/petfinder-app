 // models/user.js

const users = [];

module.exports = users;

// models/user.js

class User {
  constructor(name, email, password, location) {
    this.id = Date.now().toString(); // Generar un ID único
    this.name = name;
    this.email = email;
    this.password = password; // Asegúrate de encriptar esto al guardarlo
    this.location = location;
  }
}

module.exports = User;
