 const bcrypt = require('bcrypt');
const { sendEmail } = require('../services/emailService'); // Importá tu servicio de email
const users = []; // Simulando base de datos

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el email ya está registrado
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).send('El email ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ id: Date.now().toString(), name, email, password: hashedPassword });

    // Enviar email de bienvenida
    const subject = 'Bienvenido a PetFinder';
    const body = `<h1>Gracias por registrarte, ${name}!</h1>`;
    await sendEmail(email, subject, body);

    res.status(201).send('Usuario registrado');
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).send('Error al registrar el usuario');
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).send('Usuario no encontrado');
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send('Contraseña incorrecta');
  res.status(200).send('Login exitoso');
};

const getUserInfo = (req, res) => {
  res.json({ id: '123', name: 'Fran', email: 'fran@mail.com' });
};

module.exports = { registerUser, loginUser, getUserInfo };
