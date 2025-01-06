const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router('backend/db.json');
const middlewares = jsonServer.defaults();

// Middleware para servir archivos estáticos
server.use(jsonServer.defaults({
  static: path.join(__dirname, './') // Ruta de tu proyecto
}));

server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`JSON Server está corriendo en http://localhost:${port}`);
});
