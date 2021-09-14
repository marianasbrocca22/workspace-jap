var product = {};
var commentsArray = [];


function showProductImages(array) {
    let htmlContentToAppend = "";

    array.forEach(element => {
        activeClass = array.length == 0? ' active ' : '';

        htmlContentToAppend += `<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item" ${activeClass}>
                <img src=" ${element.images} " class="d-block w-100" alt="">
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
    </div> `
    });

    /*for (let i = 0; i < array.length; i++) {
        let primeraimg = array[0];
        let imageSrc = array[i];
        

        htmlContentToAppend += `

        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src=" ${primeraimg} " class="d-block w-100" alt="">
                </div>
                <div class="carousel-item">
                    <img src=" ${imageSrc} " class="d-block w-100" alt="">
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





        `*/

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    //}
}

function addComents(commentsArray){
   
   let htmlContentToAppend = "";
    for(let i = 0; i < commentsArray.length; i++){ // el for recorre por indice. Recorre currentCategoriesArray que es una lista de categorias y es lo que se tiene que mostrar en html
        let coment = commentsArray[i]; // declara una variable categori y carga el elemento que está en la posicion i que está en currentCategoriesArray. Categori es el elemento que hay en esa posicion de la lista 
        htmlContentToAppend += `
        <p><a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                Mostrar comentarios
            </a></p>
            <div class="collapse row" id="collapseExample">
                <div class="card card-body col-12">
                            
                    <p class="card-title">${coment.user} ${coment.dateTime}</p>
                    <p>${coment.description}</p>
                    <p>${coment.score}</p>

                    
                </div>
            </div>
        
        `
} 

document.getElementById("oldcoments").innerHTML =htmlContentToAppend;
}


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