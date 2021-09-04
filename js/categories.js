const ORDER_ASC_BY_NAME = "AZ"; //constante con valor a-z
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortCategories(criteria, array){ //funcion que devuelve una lista ordenada 
    let result = []; //lista sin nada. esta variable va a ser lo que devuelva la funcion. 
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) { // sort es una f de js y adentro se define como se quiere que se ordene mediante una f anonima. Sort va a ir procesando de a dos elementos en la lista. Para esos dos elementos con la f voy a definir que elemento va a poner primero.
            if ( a.name < b.name ){ return -1; } // si a es menor me lo devuelve al reves, si es negativo el primer elemento va antes que el segundo. El a y b son categorias, por lo que tiene atributos. 
            if ( a.name > b.name ){ return 1; } //si a es mayor devuelve la lista normal, si es positivo, el segundo elemento va antes que el primero.
            return 0; // si devueleve 0, deja las cosas como esán 
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.productCount); // el campo productCoun venía como texto, entonces hay que pasarlo a número. 
            let bCount = parseInt(b.productCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showCategoriesList(){

    let htmlContentToAppend = ""; // contendio que va a agregar a un html
    for(let i = 0; i < currentCategoriesArray.length; i++){ // el for recorre por indice. Recorre currentCategoriesArray que es una lista de categorias y es lo que se tiene que mostrar en html
        let category = currentCategoriesArray[i]; // declara una variable categori y carga el elemento que está en la posicion i que está en currentCategoriesArray. Categori es el elemento que hay en esa posicion de la lista 

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.productCount) >= minCount)) && //si está vacio es undeined. ParseInt pasa un texto a numero
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount))){ // si se cumple con todo esto pasa abajo para mostrar 

            htmlContentToAppend += `
            <a href="category-info.html" class="list-group-item list-group-item-action"> 
                <div class="row">
                    <div class="col-3">
                        <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ category.name +`</h4>
                            <small class="text-muted">` + category.productCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + category.description + `</p>
                    </div>
                </div>
            </a>
            `
            //el a hace que todo sea clickeable 
        }
    }
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    
}

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray); // devuelve una lista ordenada, con el criterrio para ordenar y la lista a ordenar. constante que indica que el criterio va a ser por nombre de la a - z. 

    //Muestro las categorías ordenadas
    showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
// se asegura que se haya cargado toda la pagina 
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CATEGORIES_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data); // funcion que ordena y muestra categorias, recibe dos parametros, el criterio de orden y la lista que va a tomar para ordenar. 
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_NAME); //solo se le pasa un criterio
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value; // setea el valor que va a estar en el input
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount); // guardo como número el string 
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showCategoriesList();
    });
});