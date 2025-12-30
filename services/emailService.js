 // emailService.js
const isDev = process.env.NODE_ENV !== 'production';

if (isDev) {
  const sendEmail = (to, subject, body) => {
    console.log(`Email simulado enviado a: ${to}`);
    console.log(`Asunto: ${subject}`);
    console.log(`Cuerpo: ${body}`);
  };
  module.exports = { sendEmail };
} else {
  const sendEmail = async (to, subject, body) => {
    // Aquí va la lógica real para producción
  };
  module.exports = { sendEmail };
}

