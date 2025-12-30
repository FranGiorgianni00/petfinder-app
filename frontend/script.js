 document.getElementById('reportForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de la forma tradicional

    const email = document.getElementById('email').value;
    const nombreMascota = document.getElementById('nombreMascota').value;
    const estado = document.getElementById('estado').value;
    const ubicacion = document.getElementById('ubicacion').value;

    // Hacer la solicitud POST
    fetch('http://localhost:3000/reportar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, nombreMascota, estado, ubicacion }),
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Mostrar la respuesta del servidor
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
