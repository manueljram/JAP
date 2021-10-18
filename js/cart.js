let productosCarrito=[];




/*completa la función para actualizar el subtotal del producto al modificar la cantidad del mismo*/
function updateProductoSubtotal(){
    let cost = 0;
    let cant = 0;
    let subtotal = 0;
    for (let i =0; i< productosCarrito.length; i++){
        cost = productosCarrito[i].unitCost;
        cant = document.getElementById(i).value;
        document.getElementById("subtotal"+i).innerHTML = productosCarrito[i].currency +" "+ cost*cant;
        subtotal += cost*cant
    }
    document.getElementById("subtotal").innerHTML = "$ "+ subtotal;
}

/*modificar la función showCarrito para que aparezca el subtotal del producto en base a la cantidad y precio unitario*/
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
    document.getElementById("carrito").innerHTML = htmlToAppend;
    document.getElementById("subtotal").innerHTML = "$ "+subtotal;


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
        console.log(productosCarrito);
    })
})
