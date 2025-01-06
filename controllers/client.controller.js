import { clientServices } from "../services/client-service.js";
import { MostrarProductos } from "./mostrar.productos.controller.js";

// Capturando las secciones para cada categoría
const productosStarWars = document.querySelector("[data-star-wars]");
const productosConsolas = document.querySelector("[data-consolas]");
const productosDiversos = document.querySelector("[data-diversos]");

// Función para mostrar productos
clientServices.listaProductos()
  .then(data => {
    // Verificar si los datos están disponibles
    if (!data || !Array.isArray(data)) {
      console.error("Los datos obtenidos no son válidos o están vacíos.");
      return;
    }

    // Recorrer los productos y mostrarlos según la categoría
    data.forEach(({ nombre, precio, descripcion, imagen, id, categoria }) => {
      const nuevoProducto = MostrarProductos(nombre, precio, descripcion, imagen, id, categoria);

      // Determinar a qué sección pertenece el producto
      if (categoria === "Star wars") {
        productosStarWars.appendChild(nuevoProducto);
      } else if (categoria === "Consolas") {
        productosConsolas.appendChild(nuevoProducto);
      } else if (categoria === "Diversos") {
        productosDiversos.appendChild(nuevoProducto);
      } else {
        console.warn(`Categoría desconocida: ${categoria}`);
      }
    });
  })
  .catch(error => {
    console.error("Error al cargar los productos:", error);
    alert("Hubo un error al cargar los productos. Por favor, intenta de nuevo más tarde.");
  });
