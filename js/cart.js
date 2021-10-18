let elementosCarrito = [];
const TIPO_MONEDA_UY = "UYU";
const COTIZACION_DOLAR = 40;

//funcion que muestra los elementos del carrito
function showCarrito(array){
    htmlContentToAppend ="";
    htmlContentToAppend =`<tr>
                <th scope="col">Productos</th>
                <th scope="col">Nombre</th>
                <th scope="col">Costo</th>
                <th scope="col">Cantidad de productpos</th>
                <th scope="col">Subtotal</th> 
            </tr>`;

        for(let i = 0; i < array.length; i++){
            let elementos= array[i];
            let moneda;
                if(elementos.currency === "USD"){
                   moneda = elementos.unitCost*COTIZACION_DOLAR;
                    }else {moneda= elementos.unitCost};

            htmlContentToAppend +=`
                    <tr>
                        <td><img src="${elementos.src}" class="img-fluid img-thumbnail"></td>
                        <td>${elementos.name}</td>
                        <td>${TIPO_MONEDA_UY} ${moneda}</td>
                        <td><input type="number" min="1" id="${i}" value="${elementos.count}" class="inputCount form-control" 
                        data-cost="${moneda}" data-curren="${TIPO_MONEDA_UY}"></td>
                        <td>${TIPO_MONEDA_UY} <span id="subtotal${i}" class="subtotal">${elementos.count * moneda}</span></td> 
                    </tr>`;
                    
        }
        
        document.getElementById("carrito").innerHTML = htmlContentToAppend;
        changeEvent();
        //calculoTotal(elementosCarrito.articles);
        calculoTotal2();
}


function changeEvent(){
    let inputs = document.getElementsByClassName("inputCount");
    for(let inp of inputs){
        inp.addEventListener("change", (event)=>{
            let costo = parseFloat(event.target.dataset.cost);
            let cantidad = parseInt(event.target.value);
            let id = event.target.getAttribute("id");
           // let moneda = event.target.getAttribute("data-curren");

            updateSubtotal(costo, cantidad, id);
            //calculoTotal(elementosCarrito.articles);
        })
    }
}

function updateSubtotal(cost, cant, id){
    let subtotal = cost*cant;
    document.getElementById("subtotal"+id).innerHTML =subtotal;
    //calculoTotal(elementosCarrito.articles);
    calculoTotal2();
}

function calculoTotal2(){
    let subtotales = document.getElementsByClassName("subtotal");
  
        let total= 0;
        for(let i = 0; i < subtotales.length; i++){
            let sub= parseInt(subtotales[i].innerHTML);
                total+=sub;
        }
        
        document.getElementById("total").innerHTML = `${TIPO_MONEDA_UY} ${total}`;
}

/*
function calculoTotal(array){   
    let total = 0;
    for(let i = 0; i < array.length; i++){
        let subtotales= parseInt(document.getElementById(`subtotal${i}`).innerHTML); //inner accede al valor del elemento que tengo seleccionado, todos los hijos del elemento que tengo seleccionado.
        total+=subtotales;
        

         }
         document.getElementById("total").innerHTML = total;
}*/




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL_2).then(resultObj=>{
        if(resultObj.status === "ok"){
            elementosCarrito = resultObj.data;
            showCarrito(elementosCarrito.articles);
        }
    })
});