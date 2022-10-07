let catID = localStorage.getItem('catID');
const AUTOS_URL = "https://japceibal.github.io/emercado-api/cats_products/" + catID + ".json"
let btnAsc = document.getElementById("sortAsc");
let btnDes = document.getElementById('sortDesc');
let btnRel = document.getElementById('sortByCount');
let btnFil = document.getElementById('rangeFilterCount');
let btnLim = document.getElementById('clearRangeFilter');
let inputMin = document.getElementById('rangeFilterCountMin');
let inputMax = document.getElementById('rangeFilterCountMax');
let productos = [];
let productosOrdenados = [];

function crearElemento(producto) {
    console.log(producto);
    let boton = document.createElement('button');
    boton.setAttribute('class', 'd-flex border-0 p-0 m-0');
    document.getElementById('principal').appendChild(boton);
    boton.innerHTML +=
        `<div class="list-group-item list-group-item-action cursor-active"><div class="row"><div class="col-3"><img src="${producto.image}" alt="auto" class="img-thumbnail"></div><div class="col"><div class="d-flex w-100 justify-content-between"><h4 class="mb-1">${producto.name} - ${producto.currency} ${producto.cost}</h4><small class="text-muted">${producto.soldCount} vendidos</small></div><p class="text-start mb-1">${producto.description}</p></div></div></div>`;
    boton.addEventListener('click', function(e){
        localStorage.setItem('objID', producto.id);
        window.location.href = 'product-info.html';
    })
}


function filtrarProductos(productos) {
    let productosFiltrados = productos.filter(producto => {
        // puede ir return en vez de let
        if (inputMin.value === '' && inputMax.value === '') {
            return true;
        }
        else if (inputMin.value === '') {
            return producto.cost <= inputMax.value;
        }
        else if (inputMax.value === '') {
            return producto.cost >= inputMin.value;
        }
        return producto.cost >= inputMin.value && producto.cost <= inputMax.value;
    })
    return productosFiltrados;
}

function ordenarProductos(criterio, productos) {
    let result = [];
    if (criterio === 'Asc') {
        result = productos.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criterio === 'Desc') {
        result = productos.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criterio === 'Rel') {
        result = productos.sort(function (a, b) {
            if (a.soldCount < b.soldCount) { return 1; }
            if (a.soldCount > b.soldCount) { return -1; }
            return 0;
        });
    }

    return result;
}

// EventListener para prevenir errores cuando se carga el script en el html
document.addEventListener("DOMContentLoaded", function () {
    //fetch para solicitar los datos de la API
    fetch(AUTOS_URL)
        .then(respuesta => respuesta.json())
        .then(datos => {
            productos = datos.products;
            productosOrdenados = datos.products;
            for (let producto of productos) {
                crearElemento(producto);
            }
        })

    btnAsc.addEventListener('click', function () {
        document.getElementById('principal').innerHTML = '';
        productosOrdenados = ordenarProductos('Asc', filtrarProductos(productos));
        for (let producto of productosOrdenados) {
            crearElemento(producto);
        }
    });

    btnDes.addEventListener('click', function () {
        document.getElementById('principal').innerHTML = '';
        productosOrdenados = ordenarProductos('Desc', filtrarProductos(productos));
        for (let producto of productosOrdenados) {
            crearElemento(producto);
        }
    });

    btnRel.addEventListener('click', function () {
        document.getElementById('principal').innerHTML = '';
        productosOrdenados = ordenarProductos('Rel', filtrarProductos(productos));
        for (let producto of productosOrdenados) {
            crearElemento(producto);
        }
    });

    btnFil.addEventListener('click', function () {
        let minPrice = inputMin.value;
        let maxPrice = inputMax.value;

        document.getElementById('principal').innerHTML = '';
        productosFiltrados = filtrarProductos(productos);
        for (let producto of productosFiltrados) {
            crearElemento(producto);
        }
    })

    btnLim.addEventListener('click', function(){
        inputMax.value = '';
        inputMin.value = '';

        for (let producto of productos) {
            crearElemento(producto);
        }
    })
})