var currentProductArray = [];



function showProductList(currentProductArray){

    let htmlContentToAppend = ""; // contendio que va a agregar a un html
    for(let i = 0; i < currentProductArray.length; i++){ // el for recorre por indice. Recorre currentCategoriesArray que es una lista de categorias y es lo que se tiene que mostrar en html
        let product = currentProductArray[i]; // declara una variable product y carga el elemento que está en la posicion i que está en currentProductArray. Product es el elemento que hay en esa posicion de la lista 

        
            htmlContentToAppend += `
            <a href="products-info.html" class="list-group-item list-group-item-action"> 
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <small class="text-muted">` + product.soldCount + ` artículos vendidos</small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                        <p class="mb-1">` + product.currency + ` `+ product.cost + `</p>
                    </div>
                </div>
            </a>
            `
            //el a hace que todo sea clickeable 
        
        }
    
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
   

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductArray = resultObj.data;
            showProductList(currentProductArray);
        }
    });


});