// importar el módulo net para crear un cliente TCP
import net from 'net';

// crear un servidor TCP que escucha en el puerto 8080
const server = net.createServer((socket) => {
  console.log('Cliente conectado');
  
  // evento que se ejecuta al recibir datos del cliente
  socket.on('data', (data) => {
    // convierte los datos recibidos a cadena y los muestra en consola
    console.log('Recibido:', data.toString());

    // respuesta en formato JSON
    const respuesta = {
      mensaje: 'Servidor recibió tu mensaje'
    };

    // envía la respuesta al cliente en formato JSON
    socket.write(JSON.stringify(respuesta));
  });
  
  // evento que se ejecuta cuando el cliente se desconecta
  socket.on('end', () => {
    console.log('Cliente desconectado');
  });
});

// el servidor escucha en el puerto 8080
server.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
});