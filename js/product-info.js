const URLOBJ = 'https://japceibal.github.io/emercado-api/products/' + localStorage.getItem('objID') + '.json';
const URLCOM = 'https://japceibal.github.io/emercado-api/products_comments/' + localStorage.getItem('objID') + '.json';
let divProducto = document.getElementById('contenedorObj');
let divComentarios = document.getElementById('divCom');
let btnEnviar = document.getElementById('btnEnviar');
let inputComment = document.getElementById('textarea');
let selectScore = document.getElementById('select');
let relatedProd = document.getElementById('related')

function desplegarElementos(objeto) {
    let i = 0;
    divProducto.innerHTML = `
    <h1>${objeto.name}</h1><hr><p class="pb-0 mb-1"><strong>Precio</strong></p><p>${objeto.currency} ${objeto.cost}</p><p class="pb-0 mb-1"><strong>Descripción</strong></p><p>${objeto.description}</p><p class="pb-0 mb-1"><strong>Categoría</strong></p><p>${objeto.category} </p><p class="pb-0 mb-1"><strong>Cantidad de vendidos</strong></p><p>${objeto.soldCount}</p><div class="d-flex flex-column align-items-center"><p><strong>Imágenes ilustrativas:</strong></p><div id="carouselExampleFade" class="carousel carousel-dark slide carousel-fade w-50" data-bs-ride="carousel">
    <div id="img-${objeto.name}" class="carousel-inner">
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
</div></div><hr>`;
    for (let imagen of objeto.images) {
        if (i === 0) {
            document.getElementById('img-' + objeto.name).innerHTML += `<div class="carousel-item active"><img src="${imagen}" class="d-block w-100" alt="..."></div>`
            i++;
        } else {
            document.getElementById('img-' + objeto.name).innerHTML += `<div class="carousel-item"><img src="${imagen}" class="d-block w-100" alt="..."></div>`
        }
    }
}

function mostrarComentarios(comentario) {
    let scoreComment = ''

    for (i = 1; i <= 5; i++) {
        if (i <= comentario.score) {
            scoreComment += `<span class="fa fa-star checked"></span>`;
        } else {
            scoreComment += `<span class="fa fa-star"></span>`;
        }
    }

    divComentarios.innerHTML +=
        `<div class="card">
        <div class="card-body">
            <div class="flex-row">
                <h5 class="card-title d-inline">${comentario.user}</h5>
                <span>- ${comentario.dateTime} -</span>
                ${scoreComment}
            </div>
            <p class="card-text">${comentario.description}</p>
        </div>
    </div>`
}

btnEnviar.addEventListener('click', function (e) {
    let comentarioUser = inputComment.value;
    let valorUsuario = selectScore.value;
    let usuario = localStorage.getItem('Email');
    let fecha = new Date();

    let opinionUsuario = {
        user: usuario,
        dateTime: fecha.toLocaleString(),
        description: comentarioUser,
        score: valorUsuario
    }
    if (comentarioUser != '') {
        mostrarComentarios(opinionUsuario);
        inputComment.value = '';
        inputComment.removeAttribute('placeholder');
    } else {
        inputComment.setAttribute('placeholder', 'Debe ingresar algo');
    }
})

function mostrarRelacionados(objeto) {
    for (let producto of objeto.relatedProducts) {
        relatedProd.innerHTML += `<div class="col" style="max-width: 20rem;">
        <div id="prod-${producto.name}" class="card cursor-active">
          <img src="${producto.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${producto.name}</h5>
          </div>
        </div>
      </div>`
    }
    for (let producto of objeto.relatedProducts) {
        document.getElementById('prod-' + producto.name).addEventListener('click', function (e) {
            localStorage.setItem('objID', producto.id);
            window.location.href = 'product-info.html';
        })
    }

}

document.addEventListener('DOMContentLoaded', function () {
    fetch(URLOBJ)
        .then(response => response.json())
        .then(objeto => {
            console.log(objeto);
            desplegarElementos(objeto);
            mostrarRelacionados(objeto);
        })

    fetch(URLCOM)
        .then(response => response.json())
        .then(comentarios => {
            for (let comentario of comentarios) {
                mostrarComentarios(comentario);
            }
        })
})