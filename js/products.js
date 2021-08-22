async function showProductsList(url){
    var htmlContentToAppend = ""
    var list = await getjsondataasyinc(url);
    list.forEach(element => {
        htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + element.imgSrc + `" alt="` + element.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ element.name +`</h4>
                            <small class="text-muted">Precio: `+ element.cost + `</small>
                            
                        </div>
                        <p class="mb-1">` + element.description + `</p>
                        <small class="text-muted">Vendidos: ` + element.soldCount + `</small>

                    </div>
                </div>
        </a>`
        
    });
    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    showProductsList(PRODUCTS_URL);

});