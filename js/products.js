const ORDER_ASC_BY_COST = "MenMay"; //constante con valor a-z
const ORDER_DESC_BY_COST = "MayMen";
const ORDER_BY_PROD_SOLDCOUNT = "SoldCount";
var currentProductArray = [];
var currentSortCriteria = undefined; // variable vacía con el valor indefiido. Se va a poder modificar de cualquier lugar y de cualquier funcción
var minCost = undefined;
var maxCost = undefined;
var filtrar = undefined;

function sortProducts(criteria, array){ //funcion que devuelve una lista ordenada 
    let result = []; //lista sin nada. esta variable va a ser lo que devuelva la funcion. 
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) { // sort es una f de js y adentro se define como se quiere que se ordene mediante una f anonima. Sort va a ir procesando de a dos elementos en la lista. Para esos dos elementos con la f voy a definir que elemento va a poner primero.
            
            if ( a.cost < b.cost ){ return -1; } // si a es menor me lo devuelve al reves, si es negativo el primer elemento va antes que el segundo. El a y b son productos, por lo que tiene atributos. 
            if ( a.cost > b.cost ){ return 1; } //si a es mayor devuelve la lista normal, si es positivo, el segundo elemento va antes que el primero.
            return 0; // si devueleve 0, deja las cosas como esán 
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
           
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_SOLDCOUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount); // el campo productCoun venía como texto, entonces hay que pasarlo a número. 
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductList(){

    let htmlContentToAppend = ""; // contendio que va a agregar a un html
    for(let i = 0; i < currentProductArray.length; i++){ // el for recorre por indice. Recorre currentCategoriesArray que es una lista de categorias y es lo que se tiene que mostrar en html
        let product = currentProductArray[i]; // declara una variable product y carga el elemento que está en la posicion i que está en currentProductArray. Product es el elemento que hay en esa posicion de la lista 
       
        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) && //si está vacio es undeined. ParseInt pasa un texto a numero
        ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))
       /* && (filtrar == undefined) || (filtrar!= undefined && producto.nombre.includes(filtrar))*/){ // si se cumple con todo esto pasa abajo para mostrar 

        
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
        }
    
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
   
    function sortAndShowProducts(sortCriteria, productsArray){ //parametros locales 
        currentSortCriteria = sortCriteria; // a la variable global currentSortCriteria le setea sortCriteria (uno de los 1eros 3 datos de orden)
    
        if(productsArray != undefined){
            currentProductArray = productsArray; // setea la lista del json en la variable currentProductArray
        }
    
        currentProductArray = sortProducts(currentSortCriteria, currentProductArray); // devuelve una lista ordenada, con el criterrio para ordenar y la lista a ordenar. constante que indica que el criterio va a ser por nombre de la a - z. 
    
        //Muestro las categorías ordenadas
        showProductList();
    }



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data); // funcion que ordena y muestra categorias, recibe dos parametros, el criterio de orden y la lista que va a tomar para ordenar. 
        }
    });

    document.getElementById("sortcostAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST); //solo se le pasa un parametro en lugar de los dos. Los otros parametros quedan undefined. Cómo la 1era vez que entro se seteo no se perdió porque la lista quedo guardada globalmente. 
    });

    document.getElementById("sortcostDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortBySold").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_SOLDCOUNT);
    });

    document.getElementById("clearRangeSoldCountFilter").addEventListener("click", function(){
        document.getElementById("rangeFiltersoldcountMin").value = "";
        document.getElementById("rangeFiltersoldcountMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductList();
    });

    document.getElementById("rangeProductFilter").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCost = document.getElementById("rangeFiltersoldcountMin").value;
        maxCost = document.getElementById("rangeFiltersoldcountMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        showProductList();
    });

    /*document.getElementById("buscador").addEventListener("keyup", function(){
       filtrar = document.getElementById("buscador").value;

       if ((filtrar != undefined) && (filtrar != "")) {
        maxCost = parseInt(maxCost);
    }
    else{
        filtrar = undefined;
    }
        showProductList();
    });*/

});