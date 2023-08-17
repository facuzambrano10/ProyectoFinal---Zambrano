const contenedorTarjetas = document.getElementById("cart-container");
const cantidadElement = document.getElementById("cantidad");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesContainer = document.getElementById("totales");
const nuevoBotonAlerta = document.getElementById("nuevo-boton-alerta");


function crearTarjetasProductosCarrito() {
  contenedorTarjetas.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem("remeras"));
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      const nuevaRemera = document.createElement("div");
      nuevaRemera.classList = "tarjeta-producto";
      nuevaRemera.innerHTML = `
    <img src="./img/productos/${producto.id}.jpg" alt="Bicicleta 1">
    <h3>${producto.nombre}</h3>
    <span>$${producto.precio}</span>
    <div>
    <button>-</button>
    <span class="cantidad">${producto.cantidad}</span>
    <button>+</button>
    </div>
    `;
      contenedorTarjetas.appendChild(nuevaRemera);
      nuevaRemera
        .getElementsByTagName("button")[0]
        .addEventListener("click", (e) => {
          const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
          cantidadElement.innerText = restarAlCarrito(producto);
          crearTarjetasProductosCarrito();
          actualizarTotales();
        });
      nuevaRemera
        .getElementsByTagName("button")[1]
        .addEventListener("click", (e) => {
          const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
          cantidadElement.innerText = agregarAlCarrito(producto);
          actualizarTotales();
        });
    });
  }
  revisarMensajeVacio();
  actualizarTotales();
  actualizarNumeroCarrito();
}

crearTarjetasProductosCarrito();

/** Actualiza el total de precio y unidades de la página del carrito */
function actualizarTotales() {
  const productos = JSON.parse(localStorage.getItem("remeras"));
  let cantidad = 0;
  let precio = 0;
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      cantidad += producto.cantidad;
      precio += producto.precio * producto.cantidad;
    });
  }
  cantidadElement.innerText = cantidad;
  precioElement.innerText = precio;
  if(precio === 0) {
    reiniciarCarrito();
    revisarMensajeVacio();
  }
}



fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al obtener los datos de la API o servidor.');
    }
    return response.json(); // Parsear la respuesta como JSON
  })
  .then(data => {
    // Aquí puedes utilizar los datos obtenidos de la API o servidor
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });



nuevoBotonAlerta.addEventListener("click", () => {
  // Mostrar una nueva alerta utilizando SweetAlert2
  Swal.fire({
    icon: 'info',
    title: '¡Nueva Alerta!',
    text: 'Esta por realizar la compra de sus productos.'
  });
});

const finalizarCompraBtn = document.getElementById("finalizar-compra");

finalizarCompraBtn.addEventListener("click", finalizarCompra);

function finalizarCompra() {
  const productos = JSON.parse(localStorage.getItem("remeras"));

  if (!productos || productos.length === 0) {
    alert("El carrito está vacío. Agrega productos antes de finalizar la compra.");
    return;
  }

  reiniciarCarrito();
  revisarMensajeVacio();
  alert("¡Compra exitosa! Gracias por tu pedido.");
}

document.getElementById("reiniciar").addEventListener("click", () => {
  contenedorTarjetas.innerHTML = "";
  reiniciarCarrito();
  revisarMensajeVacio();
});



/** Muestra o esconde el mensaje de que no hay nada en el carrito */
function revisarMensajeVacio() {
  const productos = JSON.parse(localStorage.getItem("remeras"));
  carritoVacioElement.classList.toggle("escondido", productos);
  totalesContainer.classList.toggle("escondido", !productos);

  
}
