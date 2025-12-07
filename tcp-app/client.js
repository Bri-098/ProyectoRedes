// importar el módulo net para crear una conexión TCP
import net from 'net';

// crear un cliente TCP y se conecta al puerto 8080
const Client = net.createConnection({ port: 8080 }, () => {
  // log de conexión exitosa
  console.log('Conectado al servidor!');
  
  // mensaje en formato JSON
  const mensaje = {
    texto: 'Hola desde el cliente TCP'
  };
  
  // enviar el mensaje al servidor en formato JSON
  Client.write(JSON.stringify(mensaje));
});

// evento que se ejecuta cuando cliente recibe datos del servidor
Client.on('data', (data) => {
  // muestra los datos recibidos en consola
  console.log('Recibido del servidor:', data.toString());
  Client.end();
});

// evento que se ejecuta cuando el cliente se desconecta
Client.on('end', () => {
  console.log('Desconectado del servidor');
});

// manejar errores de conexión
Client.on('error', (err) => {
  console.error('Error de conexión:', err.message);
});