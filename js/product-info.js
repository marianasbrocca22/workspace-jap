var product = {}; //objeto de info de producto
var commentsArray = []; //lista de comentarios
let newcomentsArray = []; //lista para nuevos comentarios
let relatedProduct =[];

//guardar y mostrar nuevos comentarios
function showComents(){
    let htmlContentToAppend = "";
    //var activeCarru = document.getElementById("carruselActivo");

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
    htmlContentToAppend += `<div class="carousel-item active"> <img src="${array[0]}" alt=""></div>`

    for (let i = 1; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `

        <div class="carousel-item">
              <img src="${imageSrc}" alt="">
            </div>`

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    };
};


//agregar la lista de comentarios y mostrarla
function addComents(commentsArray){
   
   let htmlContentToAppend = `<p><a class="btn btn-primary mt-3" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
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


//funcion que muestra los productos relacionados 
function showRelatedProducts(array){
    let htmlContentToAppend = "";
    for(let i = 0; i< array.length; i++){
        let related = array[i];
        htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="${relatedProduct[related].imgSrc}" alt="${relatedProduct[related].description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${relatedProduct[related].name}</h4>
                            <small class="text-muted">${relatedProduct[related].soldCount }artículos vendidos</small>
                        </div>
                        <p class="mb-1">${relatedProduct[related].description}</p>
                        <p class="mb-1">${relatedProduct[related].currency} ${relatedProduct[related].cost}</p>
                    </div>
                </div>
            </a>
            `
    }
    document.getElementById("relatedProducts").innerHTML =htmlContentToAppend;
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

            //Muestro las imagenes en carousel
            showProductImages(product.images);

            //se hace la petición de la lista de los productos
            getJSONData(PRODUCTS_URL).then(respuesta=>{
                if(respuesta.status === "ok"){
                 relatedProduct = respuesta.data;

                 showRelatedProducts(product.relatedProducts)
                 //mostrar productos relacionados de la lista de productos totales  
                }
            })
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