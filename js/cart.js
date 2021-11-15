let productosCarrito=[];
let costoEnvio = 1.15



/*función para actualizar el subtotal del producto al modificar la cantidad del mismo*/
function updateProductoSubtotal(){
    let cost = 0;
    let cant = 0;
    let subtotal = 0;
    for (let i =0; i< productosCarrito.length; i++){
        cost = productosCarrito[i].unitCost;
        cant = document.getElementById(i).value;
        document.getElementById("subtotal"+i).innerHTML = productosCarrito[i].currency +" "+ cost*cant;
        subtotal += cost*cant;
    }
    let total = Math.round(costoEnvio*subtotal)
    let envio = total - subtotal
    document.getElementById("costoEnvio").innerHTML = "$ " + envio;
    document.getElementById("subtotal").innerHTML = "$ "+ subtotal;
    document.getElementById("total").innerHTML = "$ "+ total
}

/*función showCarrito para que aparezca el subtotal del producto en base a la cantidad y precio unitario*/
function showCarrito(){

    /*mostrar los productos del carrito con el input correspondiente a la cantidad*/
    let htmlToAppend = "";
    let i = 0
    let subtotal = 0
    for(let article of productosCarrito){
        
        htmlToAppend += `
        <tr>
        <td><img src="${article.src}" class = "img-fluid" style ="max-width:50px!important"></td>
        <td class="align-middle">${article.name}</td>
        <td class="align-middle">${article.currency} ${article.unitCost}</td>
        <td class="align-middle"><input type="number" min ="1" value=${article.count} id ="${i}" class="cantidad" onchange ="updateProductoSubtotal()"></td>
        <td class="align-middle" id ="${"subtotal"+i}">${article.currency} ${article.unitCost * article.count}</td>
        </tr>`
        i ++;          
                       
       subtotal += article.count * article.unitCost;
    }
    let total = Math.round(costoEnvio*subtotal);
    let envio = total - subtotal
    document.getElementById("carrito").innerHTML = htmlToAppend;
    document.getElementById("costoEnvio").innerHTML = "$ " + envio;
    document.getElementById("subtotal").innerHTML = "$ "+ subtotal;
    document.getElementById("total").innerHTML = "$ "+ total


}



function getCarrito(url){
    
    return fetch(url)
    .then(respuesta=>{
        return respuesta.json();
    })
    
}

document.addEventListener("DOMContentLoaded", function(e){
    getCarrito(CART_INFO_URL)
    .then(respuesta=>{
        productosCarrito = respuesta.articles;
        showCarrito(); 
        
    })
})

document.getElementById("radioPremium").addEventListener("change", function(){
    costoEnvio = 1.15;
    updateProductoSubtotal()
});

document.getElementById("radioExpres").addEventListener("change", function(){
    costoEnvio = 1.07;
    updateProductoSubtotal()
});

document.getElementById("radioStandard").addEventListener("change", function(){
    costoEnvio = 1.05;
    updateProductoSubtotal()
});

document.getElementById("comprar").addEventListener("click", function(e){

    let departamento = document.getElementById("InputDepartamento");
    let localidad = document.getElementById("InputLocalidad");
    let calle = document.getElementById("InputCalle");
    let numero = document.getElementById("InputNumero");
    let esquina = document.getElementById("InputEsquina");
    let infoMissing = false;

    //Quito las clases que marcan como inválidos
    departamento.classList.remove('is-invalid');
    localidad.classList.remove('is-invalid');
    calle.classList.remove('is-invalid');
    numero.classList.remove('is-invalid');
    esquina.classList.remove('is-invalid');
    document.getElementById("cardNumber").classList.remove('is-invalid');
    document.getElementById("securityID").classList.remove('is-invalid');
    document.getElementById("vencimiento").classList.remove('is-invalid');
    document.getElementById("cuentanro").classList.remove('is-invalid');

    // Quita los avisos de los campos obligatorios faltantes.
    document.getElementById("smlocalidad").innerHTML = ""
    document.getElementById("smdepartamento").innerHTML = ""
    document.getElementById("smnumero").innerHTML = ""
    document.getElementById("smcalle").innerHTML = ""
    document.getElementById("smmodal").innerHTML = ""
    document.getElementById("smcardnumber").innerHTML= "" 
    document.getElementById("smsecurity").innerHTML= "" 
    document.getElementById("smvencimiento").innerHTML= "" 
    document.getElementById("smcuenta").innerHTML= ""

    //Se realizan los controles necesarios,
    //En este caso se controla que se haya ingresado el nombre y categoría.
    //Consulto por el nombre del producto
    if (departamento.value === "")
    {
        departamento.classList.add('is-invalid');
        document.getElementById("smdepartamento").innerHTML = "Debes especificar un departamento"
        infoMissing = true;
    }
    
    //Consulto por la categoría del producto
    if (localidad.value === "")
    {
        localidad.classList.add('is-invalid');
        document.getElementById("smlocalidad").innerHTML = "Debes especificar una localidad"
        infoMissing = true;
    }

    //Consulto por el costo
    if (numero.value ==="")
    {
        numero.classList.add('is-invalid');
        document.getElementById("smnumero").innerHTML = "Debes especificar un numero"
        infoMissing = true;
    }

    if (calle.value ==="")
    {
        calle.classList.add('is-invalid');
        document.getElementById("smcalle").innerHTML = "Debes especificar una calle"
        infoMissing = true;
    }

    if (document.getElementById("creditCardPay").checked=== false && document.getElementById("bankingPay").checked=== false){
        document.getElementById("smmodal").innerHTML = "Debes especificar un metodo de pago"
        infoMissing = true;
    }

    if (document.getElementById("creditCardPay").checked=== true){
        if (document.getElementById("cardNumber").value ==="")
    {
        document.getElementById("cardNumber").classList.add('is-invalid');
        document.getElementById("smcardnumber").innerHTML= "debe agregar una tarjeta"
        document.getElementById("smmodal").innerHTML= "metodo de pago invalido"

        infoMissing = true;
    }
    if (document.getElementById("securityID").value ==="")
    {
        document.getElementById("securityID").classList.add('is-invalid');
        document.getElementById("smsecurity").innerHTML= "codigo de seguridad invalido"
        document.getElementById("smmodal").innerHTML= "metodo de pago invalido"

        infoMissing = true;
    }
    if (document.getElementById("vencimiento").value ==="")
    {
        document.getElementById("vencimiento").classList.add('is-invalid');
        document.getElementById("smvencimiento").innerHTML= "fecha de vencimiento invalida"
        document.getElementById("smmodal").innerHTML= "metodo de pago invalido"

        infoMissing = true;
    }
    }

    if (document.getElementById("bankingPay").checked=== true){
        if (document.getElementById("cuentanro").value ==="")
    {
        document.getElementById("cuentanro").classList.add('is-invalid');
        document.getElementById("smcuenta").innerHTML= "debe agregar una tarjeta"
        document.getElementById("smmodal").innerHTML= "metodo de pago invalido"

        infoMissing = true;
    }
    }

    if(!infoMissing)
    {
        alert("Compra realizada con éxito")
        window.location = "home.html"
        
    }
})

document.getElementById("creditCardPay").addEventListener("change", function(e){
    document.getElementById("cardNumber").disabled = false;
    document.getElementById("securityID").disabled = false;
    document.getElementById("vencimiento").disabled = false;

    document.getElementById("cuentanro").disabled = true;

})

document.getElementById("bankingPay").addEventListener("change", function(e){
    document.getElementById("cardNumber").disabled = true;
    document.getElementById("securityID").disabled = true;
    document.getElementById("vencimiento").disabled = true;

    document.getElementById("cuentanro").disabled = false;

})