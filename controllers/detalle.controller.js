import { clientServices } from "../services/client-service.js";

// Crear la card del producto relacionado
const mostrarProductosRelacionados = (nombre, precio, descripcion, imagen, id) => {
  const cardProducto = document.createElement("div");
  cardProducto.className = "producto__card";
  const contenido = `
    <div class="producto__card__imagen" style="background-image: url(${imagen});"></div>
    <h3 class="producto__card__titulo">${nombre}</h3>
    <p class="producto__card__precio">$${precio}</p>
    <a class="producto__card__boton" href="../screens/ver-producto.html?id=${id}">Ver producto</a>
  `;
  cardProducto.innerHTML = contenido;
  return cardProducto;
};

const obtenerInformacion = async () => {
  const url = new URL(window.location);
  const id = url.searchParams.get("id");

  if (!id) {
    console.error("No se encontró un ID en la URL.");
    return;
  }

  try {
    // Obtener información del producto
    const producto = await clientServices.detalleProducto(id);

    if (!producto || Object.values(producto).some(val => val === undefined)) {
      throw new Error("Datos del producto incompletos.");
    }

    // Mostrar detalles del producto
    const infoProducto = document.querySelector("[data-producto]");
    infoProducto.innerHTML = `
      <img class="producto__imagen" src="${producto.imagen}" alt="${producto.nombre}">
      <div class="producto__info">
          <h2 class="producto__info__titulo">${producto.nombre}</h2>
          <p class="producto__info__valor">$${producto.precio}</p>
          <p class="producto__info__descripcion">${producto.descripcion}</p>
      </div>
    `;

    // Mostrar productos relacionados
    const categoriaSolicitada = producto.categoria;
    const idProductoVisto = producto.id;
    const productosSimilares = document.querySelector("[data-productos-similares]");
    const productos = await clientServices.listaProductos();

    for (const { nombre, precio, descripcion, imagen, id, categoria } of productos) {
      if (categoria === categoriaSolicitada && idProductoVisto != id) {
        const nuevoProducto = mostrarProductosRelacionados(nombre, precio, descripcion, imagen, id);
        productosSimilares.appendChild(nuevoProducto);
      }
    }
  } catch (error) {
    console.error("Error al cargar el producto o los relacionados:", error.message);
    alert("Ocurrió un error al cargar la información del producto.");
  }
};

obtenerInformacion();
