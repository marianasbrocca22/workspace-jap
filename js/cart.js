let elementosCarrito = [];
const TIPO_MONEDA_UY = "UYU";
const COTIZACION_DOLAR = 40;
const PERCENTAGE_SYMBOL = "%";
let PORCENTAJE= 0.15;
let SUBTOTAL = 0;

//funcion que muestra los elementos del carrito
function showCarrito(array){
    htmlContentToAppend ="";
    htmlContentToAppend =`<tr>
                <th scope="col">Productos</th>
                <th scope="col">Nombre</th>
                <th scope="col">Costo</th>
                <th scope="col">Cantidad de productpos</th>
                <th scope="col">Subtotal</th>
                <th></th> 
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
                        <td><button type="button" class="btn btn-info mt-2" id="quitar${i}" onclick="quitarElemento(${i})">-</button></td>
                    </tr>`;
                    
        }
        
        document.getElementById("carrito").innerHTML = htmlContentToAppend;
        changeEvent();
        calculoTotal2();
        updateTotal()
}

//funcion para quitar un elemento de la lista
function quitarElemento(i){
    elementosCarrito.articles.splice(i, 1);//elimina el elemento del arreglo
    showCarrito(elementosCarrito.articles);//lo elimino del arreglo y tengo que volver a mostrar el carrito para que muetsre acorde al nuevo html.
}

//funcion que al detectar un cambio en los input actualiza los subtotales
function changeEvent(){
    let inputs = document.getElementsByClassName("inputCount");
    for(let inp of inputs){
        inp.addEventListener("change", (event)=>{
            let costo = parseFloat(event.target.dataset.cost);
            let cantidad = parseInt(event.target.value);
            let id = event.target.getAttribute("id");
           // let moneda = event.target.getAttribute("data-curren");

            updateSubtotal(costo, cantidad, id);
           
        })
    }
}

//funcion que calcula y muestra el subtotal por producto
function updateSubtotal(cost, cant, id){
    let subtotal = cost*cant;
    document.getElementById("subtotal"+id).innerHTML =subtotal;
    calculoTotal2();
    updateTotal()
}

//función que suma todos los subtotales y muestra el subtotal semi final
function calculoTotal2(){
    let subtotales = document.getElementsByClassName("subtotal");
  
        let total= 0;
        for(let i = 0; i < subtotales.length; i++){
            let sub= parseInt(subtotales[i].innerHTML);
                total+=sub;
        }
        SUBTOTAL = total; //guardo el valor de subtotal total en variable global 
        
        document.getElementById("total").innerHTML = `${TIPO_MONEDA_UY} ${total}`;
}

//funcion que actualiza los datos del total, suma subtotal más el costo de envío
function updateTotal(){
    let subtotalHTML = document.getElementById("subtotalCostText");
    let comissionHTML = document.getElementById("comissionText");
    let totalCostHTML = document.getElementById("totalCostText");

    let subTotalCost = `${TIPO_MONEDA_UY} ${SUBTOTAL}`;//muestra el subtotal
    let comission = Math.round((PORCENTAJE * 100)) + PERCENTAGE_SYMBOL; //muestra el porcentaje que se seleccionó
    let totalCost = TIPO_MONEDA_UY + (Math.round((SUBTOTAL * PORCENTAJE)+(SUBTOTAL)));//calcula el costo total, suma el porcentaje que se le aplica al subtotal + el subtotal

    subtotalHTML.innerHTML = subTotalCost;
    comissionHTML.innerHTML = comission;
    totalCostHTML.innerHTML = totalCost;
}

//funcion para validar los input para comprar
function validar(){

    let tarjeta = document.getElementById("tcredito");
    let cuentaBancaria = document.getElementById("tbancaria");
    let numeroTarjeta = document.getElementById("numeroTarjeta");
    let codigoSeguridad = document.getElementById("codigoSeg");
    let vencimiento = document.getElementById("vencimiento");
    let numeroCuenta = document.getElementById("numeroCuenta");
    let calle = document.getElementById("calle");
    let numero = document.getElementById("numero");
    let esquina = document.getElementById("esquina");

//para deshabilitar los campos de forma de pago
    cuentaBancaria.addEventListener("change", function(){
        numeroCuenta.disabled = false;

        numeroTarjeta.disabled = true;
        codigoSeguridad.disabled = true;
        vencimiento.disabled = true;
    })

    tarjeta.addEventListener("change", function(){
        numeroCuenta.disabled = true;

        numeroTarjeta.disabled = false;
        codigoSeguridad.disabled = false;
        vencimiento.disabled = false;
    })

//al hacer click en forma de pago valida los campos de dirección    
    document.getElementById("pago").addEventListener("click", function(){
        
       calle.classList.remove('is-invalid');//quita la clase que hace que se soliciten los datos obligatorios
       numero.classList.remove('is-invalid');
       esquina.classList.remove('is-invalid');

            if((calle.value ==="")){
                calle.classList.add('is-invalid');//asigna una clase de datos requeridos
                
            } 
            if((numero.value==="")){
                numero.classList.add('is-invalid');
                
            } 
            if((esquina.value==="")){
                esquina.classList.add('is-invalid');
                
            } 
            else{
                $('#formaPago').modal('show');
            }
    })

//al hacer click en finalizar compra valida los datos de forma de pago    
    document.getElementById("enviar").addEventListener("click", function(){
        
        numeroTarjeta.classList.remove('is-invalid');
        codigoSeguridad.classList.remove('is-invalid');
        vencimiento.classList.remove('is-invalid');

        if(tarjeta.checked){
            if(numeroTarjeta.value===""){
                numeroTarjeta.classList.add('is-invalid');    
            }
            if(codigoSeguridad.value===""){
                codigoSeguridad.classList.add('is-invalid');    
            }
            if(vencimiento.value===""){
                vencimiento.classList.add('is-invalid');    
            }
            else {
                $('#formaPago').modal('hide'); //oculta el modal
                alert("Su compra se ha realizado con éxito");//confirma la compra
            }
        }
        
        if(cuentaBancaria.checked){
            if(numeroCuenta.value===""){
                numeroCuenta.classList.add('is-invalid');
            }else {
                $('#formaPago').modal('hide');
                alert("Su compra se ha realizado con éxito");
            }
        }
    })    
}


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

    document.getElementById("prem").addEventListener("change", function(){
        PORCENTAJE = 0.15;//asigna un valor a la variable porcentaje cuando se selecciona el input radio
        updateTotal();//se actualizan los datos del total
    });
    
    document.getElementById("exp").addEventListener("change", function(){
        PORCENTAJE = 0.07;
        updateTotal();
    });

    document.getElementById("stand").addEventListener("change", function(){
        PORCENTAJE = 0.05;
        updateTotal();
    });

    updateTotal();
    validar();
    
});

