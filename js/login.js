//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function validar(){
    let user = document.getElementById("usuario").value;
    let pass = document.getElementById("pass").value;
        if((user !="")&&(pass !="")){
            window.location.href="home.html";
        }

        else{
            alert("Complete los datos faltantes para ingresar")
        }
}

document.addEventListener("DOMContentLoaded", function(e){

});