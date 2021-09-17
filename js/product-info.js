var product = {};
var commentsArray = [];
let newcomentsArray = [];

//guardar y mostrar nuevos comentarios
function showComents(){
    let htmlContentToAppend = "";

    for(let i = newcomentsArray.length -1; i >=0; i--){
        let comentario = newcomentsArray[i];

        htmlContentToAppend += `
        
                <div class="card card-body col-12">            
                    <p class="card-title"><img src="./img/user.png" alt="" class="iconUser"> ${comentario.usuario} ${comentario.fecha}</p>
                    <p>${comentario.comentarioText}</p>
                    <span> ${addStars(comentario.score)}
                </div>`
    }

    document.getElementById('newcoment').innerHTML = htmlContentToAppend;
};

 function saveComent(){
    let textoComentario= document.getElementById('coment').value;

    if(textoComentario != ''){
        let comentCompleto = {
            fecha: fecha(),
            comentarioText: textoComentario,
            usuario: localStorage.getItem('user'),
            score: document.getElementById('addScore').value
        };

        newcomentsArray.push(comentCompleto);

        showComents();
    }
    
    document.getElementById('comentFor').reset();
};


//muestra la fecha 
function fecha(){
    var fecha = new Date();
   return `${fecha.getDate()}-${(fecha.getMonth() +1)}-${fecha.getFullYear()}  ${fecha.getHours()}:${fecha.getMinutes()}`;

};

//agrega estrellas y las marca
function addStars(stars){

    let valor = parseInt(stars)
    let htmlContentToAppend = "";
    for(let i = 1; i<= valor; i++){
        htmlContentToAppend +=`<span class="fa fa-star checked"></span>`
    }
    for(let j=valor+1; j<=5; j++){
        htmlContentToAppend +=`<span class="fa fa-star"></span>`
    }
    return htmlContentToAppend;
};


//Mostrar imagenes como carrusell
function showProductImages(array) {
    let htmlContentToAppend = "";
    //var activeCarru = document.getElementById("carruselActivo");

    for (let i = 0; i < array.length; i++) {

        /*if(activeCarru.className === array[0]){
            activeCarru.className += "active";

        }*/
        
        let primeraimg = array[0];
        let imageSrc = array[i];

        htmlContentToAppend += `

        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active" id="carruselActivo">
                    <img src="${primeraimg} " class="d-block w-100" alt="">
                </div>
                <div class="carousel-item">
                    <img src="${imageSrc}" class="d-block w-100" alt="">
                </div>
            </div>
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
        </div>





        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    };
};



//agregar la lista de comentarios y mostrarla
function addComents(commentsArray){
   
   let htmlContentToAppend = `<p><a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
   Mostrar comentarios</a></p>`;
    for(let i = 0; i < commentsArray.length; i++){ // el for recorre por indice. Recorre currentCategoriesArray que es una lista de categorias y es lo que se tiene que mostrar en html
        let coment = commentsArray[i]; // declara una variable categori y carga el elemento que está en la posicion i que está en currentCategoriesArray. Categori es el elemento que hay en esa posicion de la lista 
        //let stars = coment.score;
        htmlContentToAppend += `
        
            <div class="collapse row" id="collapseExample">
                <div class="card card-body col-12">
                            
                    <p class="card-title"><img src="./img/user.png" alt="" class="iconUser"> ${coment.user} ${coment.dateTime}</p>
                    <p>${coment.description}</p>
                    <p>${addStars(coment.score)}</p>  
                </div>
            </div>
        `
}; 

document.getElementById("oldcoments").innerHTML =htmlContentToAppend;
};






//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productCurrencyHTML = document.getElementById("productCurrency");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
            // let relatedProductsHTML = document.getElementById("relatedProducts");



            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost;
            productCurrencyHTML.innerHTML = product.currency;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;
            //  relatedProductsHTML.innerHTML = product.relatedProducts;

            //Muestro las imagenes en forma de galería
            showProductImages(product.images);
        }
    });
});

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            commentsArray = resultObj.data;
            addComents(commentsArray);

        }
    });
});