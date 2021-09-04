//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function validar(){
    let user = document.getElementById("usuario").value;
    let pass = document.getElementById("pass").value;
        if((user !="")&&(pass !="")){
            SetUser();
            window.location.href="home.html";
        }

        else{
            alert("Complete los datos faltantes para ingresar")
        }
}

//fucion que guarda los datos del usario
function SetUser(){
    let nombre = document.getElementById("usuario").value; // obtengo el valor del input
    localStorage.setItem("user", nombre); // lo grardo en el local storage con set item y le doy un nombre al dato y un valor
}



document.addEventListener("DOMContentLoaded", function(e){
   
  
});