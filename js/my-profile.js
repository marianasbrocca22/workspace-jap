

function saveData(){ 
let preview = document.getElementById("pic");
let datosUsuario={
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    email: document.getElementById("email").value,
    edad: parseInt(document.getElementById("edad").value),
    tel: parseInt(document.getElementById("tel").value),
    img: preview.src
        
    }

        localStorage.setItem("dataPerfil", JSON.stringify(datosUsuario));

}

document.getElementById("save").addEventListener("click", event =>{
    saveData();
    getPerfil()
})

function getPerfil(){
    let preview = document.getElementById("pic");
    let perfilUsuario = JSON.parse(localStorage.getItem("dataPerfil"));
      if(perfilUsuario!=null){
        let userPerfilName = perfilUsuario.nombre,
        userPerfilApellido = perfilUsuario.apellido,
        userPerfilEmail = perfilUsuario.email,
        userPerfilAge = perfilUsuario.edad,
        userPerfilTel = perfilUsuario.tel,
        userPerfilImg = perfilUsuario.img;

        document.getElementById("colocarNombre").innerHTML = userPerfilName;
        document.getElementById("colocarApellido").innerHTML = userPerfilApellido;
        document.getElementById("colocarEmail").innerHTML = userPerfilEmail;
        document.getElementById("colocarEdad").innerHTML = userPerfilAge;
        document.getElementById("colocarTel").innerHTML = userPerfilTel;

        
          document.getElementById("nombre").value = userPerfilName;
          document.getElementById("apellido").value = userPerfilApellido;
          document.getElementById("email").value = userPerfilEmail;
          document.getElementById("edad").value = userPerfilAge;
          document.getElementById("tel").value = userPerfilTel;
          preview.src = userPerfilImg;
      } 
    
}

function previewFile() {
    var preview = document.getElementById('pic');
    var file    = document.getElementById('inputFile').files[0];
    var reader  = new FileReader(); //construye un objeto de tipo file reader y se guarda en una variable
  
    if (file) {
      reader.readAsDataURL(file); //si tengo el file le cargo el archivo al reader y lo transforma en base 64
    } else {
      preview.src = ""; //coloco una imagen por defecto en caso de que no se cargue ninguna
    }
    //cuando se termina de cargar el archivo se dispara la function con el reader.onloadend
    reader.onloadend = function () {
      preview.src = reader.result; //muestra lo que quedó de el archivo en base 64
    }

  }




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getPerfil();
});