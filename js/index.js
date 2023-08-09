const contenedorTarjetas = document.getElementById("productos-container");

/** Crea las tarjetas de productos teniendo en cuenta la lista en bicicletas.js */
function crearTarjetasProductosInicio(productos){
  productos.forEach(producto => {
    const nuevaRemera = document.createElement("div");
    nuevaRemera.classList = "tarjeta-producto"
    nuevaRemera.innerHTML = `
    <img src="./img/productos/${producto.id}.jpg" alt="Bicicleta 1">
    <h3>${producto.nombre}</h3>
    <p class="precio">$${producto.precio}</p>
    <button>Agregar al carrito</button>`
    contenedorTarjetas.appendChild(nuevaRemera);
    nuevaRemera.getElementsByTagName("button")[0].addEventListener("click",() => agregarAlCarrito(producto))
  });
}
crearTarjetasProductosInicio(remeras);