// Seleccionando el buscador
const buscador = document.querySelector("[data-buscador]");

// Escuchando el evento 'keypress' en el buscador
buscador.addEventListener("keypress", (evento) => {
  if (evento.key === "Enter") {
    evento.preventDefault(); // Previene el comportamiento predeterminado del formulario
    const texto = buscador.value.trim(); // Elimina espacios innecesarios

    // Validación para evitar búsquedas vacías
    if (texto.length > 0) {
      // Redirige a la página de búsqueda con el texto como parámetro
      window.location.href = `../screens/busqueda-productos.html?texto=${encodeURIComponent(texto)}`;
      buscador.value = ""; // Limpia el buscador
    } else {
      alert("Por favor, ingrese un texto para buscar.");
    }
  }
});
