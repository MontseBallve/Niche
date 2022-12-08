//Carrito
let carrito = JSON.parse(localStorage.getItem(`carrito`)) || [];

//Contenedor productos
const productos = document.querySelector(`#contenedorProductos`);

fetch(`json/productos.json`)
.then(resultado => resultado.json)
.then(data => cargarProductos.data)
.catch(error => console.log(error))
.finally (() => console.log ("Proceso Finalizado"))

// Creamos una función con iteración para mostrar los productos.
function cargarProductos (data){
    //console.log(productos)
    data.forEach(producto => {
        const card = document.createElement(`div`);
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
                <div class="card">
                    <img src = "${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class= "card-text">${producto.precio}</p>
                        <button class= "btn colorBoton btnComprar btn-primary buttonCard" id= "${producto.id}"> Agregar al carrito </button>
                        </div>
                </div>
            `
        contenedorProductos.appendChild(card);
     
    }) 
        // Agregar productos al carrito
        let btnComprar = document.querySelectorAll(`.btnComprar`);
        btnComprar.foeEach(el => {
        el.addEventListener('click', (e) => {
                agregarAlCarrito(e.target.id, data)
        })
    })
}
 
function agregarAlCarrito (id, data) {
    console.log(id)
    console.log(data)
    const productoElegido = data.find(el => el.id === parseInt(id))
    console.log(productoElegido)

    carrito.push(productoElegido)

    //Guardar el carrito en Local Storage


} 

// Mostrar el carrito de compras:

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

// Función para mostrar el carrito

const mostrarCarrito = () => {
    let aux = '';
    carrito.forEach((producto) => {
        aux += `
            <div class="card "col-xl-3", "col-md-6", "col-xs-12">
                <img src = "${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class= "card-text">${producto.precio}</p>
                    <p class= "card-text">${producto.cantidad}</p>
                    <button class= "btn colorBoton btnComprar btn-primary buttonCard" id= "${producto.id}"> Agregar al carrito </button>
                </div>
            </div>
        `    
    })
    contenedorCarrito.innerHTML = aux;
} 

// Mostramos mensaje con el cálculo total de la compra:

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach((producto) => {
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML = `Total: $${totalCompra}`;
}

calcularTotal();

const productoEnCarrito = carrito.find((producto) => producto.id === "id");
if (productoEnCarrito) {
    // En esta función hay un ejemplo de Operador ++
    productoEnCarrito.cantidad++;
} else {
    carrito.push("producto");
    // Guardamos en el Local Storage:
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
    
mostrarCarrito()

// Creamos el array carrito

//let changuito = [];

// Cargar carrito desde el LocalStorage:

/* if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
} */



//Ruta relativa

/* const listado = document.getElementById ("listado");
const listadoProductos = "json/productos.json";

fetch(listadoProductos)
    .then(respuesta => respuesta.json())
    .then(datos => {
        datos.forEach (producto => {
            listado.innerHTML += `
                <h2>Nombre: ${producto.nombre} </h2>
                <p> Precio: ${producto.precio}</p>
                <p> ID: ${producto.id}</p>
            `
        })
    })
    .catch(error => console.log(error))
    .finally (() => console.log ("Proceso Finalizado")) */
    

/* class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
} */

/* const agenda = new Producto(1, "Agendas 2023", 3950, "img/AgendaVeinteVeintitres.png");
const buzoConCapucha = new Producto(2, "Buzo con capucha", 4185, "img/BuzoConCapucha.png");
const cuadernoEspiralado = new Producto(3, "Cuaderno espiralado", 2450, "img/CuadernoEspiralado.png");
const juegoSeisVasos = new Producto(4, "Juego de 6 vasos", 2501, "img/JuegoSeisVasos.png");
const llavero = new Producto(5, "Llavero", 7500, "img/Llavero.png");
const musculosa = new Producto(6, "Musculosa", 2735, "img/Musculosa.png");
const remeraConMangas = new Producto(7, "Remera con mangas", 2998, "img/RemeraConMangas.png");
const remeraSinMangas = new Producto(8, "Remera sin mangas", 2299, "img/RemeraSinMangas.png");
const setRemeraBolsaTaza = new Producto(9, "Set remera-bolsa-taza", 4655, "img/SetRemeraBolsaTaza.png");
const taza = new Producto(10, "Taza", 1890, "img/Taza.png");
 */





// Modificamos el DOM mostrando los productos.

//const contenedorProductos = document.getElementById("contenedorProductos");









/* const agregarAlCarrito = (id) => {
    const producto = productos.find((producto) => producto.id === id);
    const productoEnCarrito = carrito.find((producto) => producto.id === id);

    // En esta función hay un ejemplo de Operador Ternario, un Operador ++, y además guardamos en Local Storage
     const agregarAlCarrito = productoEnCarrito.cantidad++ ? carrito.push(producto) : localStorage.setItem("carrito", JSON.stringify(carrito)); mostrarCarrito();
}  */





// Función que elimina el producto del carrito:

const eliminarDelCarrito = (id) => {
    const producto = carrito.find((producto) => producto.id === id);
    const indice = carrito.indexOf(producto);
    console.log(producto)
    carrito.splice(indice, 1);
    mostrarCarrito();
  

    // LocalStorage:
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Vaciamos carrito de compras:

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

// Función para eliminar todo el carrito:

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

    //LocalStorage:
    localStorage.clear();
}




