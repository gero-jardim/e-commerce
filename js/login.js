let miFormulario = document.getElementById('mi-formulario');
let miMailInput = document.getElementById("mi-mail-input");
let miPassInput = document.getElementById("mi-contraseña-input");


function checkCredentials(mail, pass) { //Verifica que ambos campos esten correctos
    let avisoMail = checkMail(mail);
    let avisoPass = checkPass(pass);
    let miDivMail = document.getElementById("div-error-mail");
    let miDivPass = document.getElementById("div-error-pass");

    if (avisoMail == "correcto" && avisoPass == "correcto") {
        window.location.href = 'index2.html'
    } else if (avisoMail == "correcto") {
        miDivPass.innerHTML = `<p class="p-error">${avisoPass}</p>`;
        miDivMail.innerHTML = ``;
    } else if (avisoPass == "correcto") {
        miDivMail.innerHTML = `<p class="p-error">${avisoMail}</p>`;
        miDivPass.innerHTML = ``;
    } else {
        miDivMail.innerHTML = `<p class="p-error">${avisoMail}</p>`;
        miDivPass.innerHTML = `<p class="p-error">${avisoPass}</p>`;
    }

}

function checkMail(mail) { //Verifica que no este vacio y el mail sea valido
    let myRexMail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i;

    if (myRexMail.test(mail)) {
        return "correcto";
    } else if (mail == "") {
        return "Ingresa tu e-mail"
    } else {
        return "Ingresa un e-mail valido";
    }
}

function checkPass(pass) { //Verifica que la contraseña sea valida

    if (pass.length > 5) {
        return "correcto";
    } else if (pass == "") {
        return "Ingresa tu contraseña"
    }
    return "Ingresa una contraseña valida";
}


document.addEventListener("DOMContentLoaded", function () {

    miFormulario.addEventListener('submit', function (evento) {
        let miMail = miMailInput.value;
        let miPass = miPassInput.value;
        evento.preventDefault();
        checkCredentials(miMail, miPass);
    });
})