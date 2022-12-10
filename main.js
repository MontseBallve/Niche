//Carrito
let carrito = JSON.parse(localStorage.getItem(`carrito`)) || [];

//Contenedor productos

const productos = document.querySelector(`#contenedorProductos`);

const contenedorProductos = document.getElementById("contenedorProductos");

const listado = document.getElementById("listado");

const listadoProductos = "json/stock.json";



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


        // Agregar productos al carrito
        let btnComprar = document.querySelectorAll(`.btnComprar`);
        btnComprar.foeEach(el => {
        el.addEventListener('click', (e) => {
                agregarAlCarrito(e.target.id, data)
        })
    })
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
    .catch (error => console.log (error))
    .finally (() => console.log ("Proceso Finalizado"))
    })
}

//const producto = productos.find((producto) => producto.id === id);

const agregarAlCarrito = (id) => {
    const producto = productos.find((producto) => producto.id === id);
    const productoEnCarrito = carrito.find((producto) => producto.id === id);

function agregarAlCarrito (id, data) {
    console.log(id)
    console.log(data)
    const productoEnCarrito = data.find(el => el.id === parseInt(id))
    console.log(productoEnCarrito)

    carrito.push(productoEnCarrito)

    //Guardar el carrito en Local Storage
    localStorage.setItem("carrito", JSON.stringify(carrito));
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
    .finally (() => console.log ("Proceso Finalizado"))
}} 

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
    verCarrito.innerHTML = aux;
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

// Función que elimina el producto del carrito:

const eliminarDelCarrito = (id) => {
    const producto = carrito.find((producto) => producto.id === id);
    const indice = carrito.indexOf(producto);
    console.log(producto)
    carrito.splice(indice, 1);
    mostrarCarrito();
  

    // LocalStorage:
    localStorage.setItem("carrito", JSON.stringify(carrito));

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
    .finally (() => console.log ("Proceso Finalizado"))
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
    .finally (() => console.log ("Proceso Finalizado"))
}






   
    
    


