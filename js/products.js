const AUTOS_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"

function crearElemento(auto) {
    document.getElementById('principal').innerHTML +=
        `<div onclick="setCatID(101)" class="list-group-item list-group-item-action cursor-active"><div class="row"><div class="col-3"><img src="${auto.image}" alt="auto" class="img-thumbnail"></div><div class="col"><div class="d-flex w-100 justify-content-between"><h4 class="mb-1">${auto.name} - ${auto.currency} ${auto.cost}</h4><small class="text-muted">${auto.soldCount} vendidos</small></div><p class="mb-1">${auto.description}</p></div></div></div>`
}


// EventListener para prevenir errores cuando se carga el script en el html
document.addEventListener("DOMContentLoaded", function () {
    //fetch para solicitar los datos de la API
    fetch(AUTOS_URL)
        .then(respuesta => respuesta.json())
        .then(datos => {
            let autos = datos.products
            console.log(autos);
            for (let auto of autos) {
                crearElemento(auto);
            }
        })
})