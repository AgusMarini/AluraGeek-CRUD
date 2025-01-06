const BASE_URL = "https://agusmarini.github.io/AluraGeek-CRUD/db.json";

// Obtener la lista de productos
const listaProductos = async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data.productos; // Asegúrate de que "productos" es una clave en tu `db.json`
};

// Obtener el detalle de un producto por ID
const detalleProducto = async (id) => {
  const productos = await listaProductos();
  return productos.find((producto) => producto.id === id); // Filtrar por ID
};

// Las siguientes funciones no funcionarán en GitHub Pages
const crearProducto = () => {
  throw new Error("La operación 'crearProducto' no es compatible en GitHub Pages.");
};

const eliminarProducto = () => {
  throw new Error("La operación 'eliminarProducto' no es compatible en GitHub Pages.");
};

const actualizarProducto = () => {
  throw new Error("La operación 'actualizarProducto' no es compatible en GitHub Pages.");
};

// Exporta solo las funciones disponibles
export const clientServices = {
  listaProductos,
  detalleProducto,
};
