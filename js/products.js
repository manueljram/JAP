const ORDER_ASC_BY_PRICE = "ASC";
const ORDER_DESC_BY_PRICE = "DESC";
const ORDER_BY_PROD_SOLD = "Rel";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;

function sortProducts(criteria, array){
    let result = []; // crea un let de tipo array que almacenará el orden en el que se mostrará
    if (criteria === ORDER_ASC_BY_PRICE) // ordena de manera ascendiente por nombre
    {
        result = array.sort(function(a, b) { //a y b son dos elementos del array dado
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);
            if ( aCost < bCost ){ return -1; }  // si a es menor que b, coloca el elemento a antes que el elemento b
            if ( aCost > bCost ){ return 1; }  // si a es mayor que b, coloca el elemento b antes que el elemento a
            return 0; //mantiene los elementos en orden
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){ //ordena de manera descendiente por nomnre
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);
            if ( aCost > bCost ){ return -1; } // si a es mayor que b, coloca el elemento a antes que el elemento b
            if ( aCost < bCost ){ return 1; } // si a es menor que b, coloca el elemento b antes que el elemento a
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_SOLD){ //ordena por cantidad de articulos
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount); //crea un let que toma cantidad de productos del elemento a y lo vuelve un entero
            let bCount = parseInt(b.soldCount); //crea un let que toma cantidad de productos del elemento b y lo vuelve un entero

            if ( aCount > bCount ){ return -1; } //si la cantidad de productos a es mayor que la cantidad de products b, ordena a antes que b
            if ( aCount < bCount ){ return 1; } //si la cantidad de productos a es menor que la cantidad de products b, ordena b antes que a
            return 0;
        });
    }

    return result;
}

function showProductsList(){
    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let products = currentProductsArray[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(products.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(products.cost) <= maxCost))){

        htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + products.imgSrc + `" alt="` + products.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ products.name +`</h4>
                            <small class="text-muted">Precio: `+ products.cost + `</small>
                            
                        </div>
                        <p class="mb-1">` + products.description + `</p>
                        <small class="text-muted">Vendidos: ` + products.soldCount + `</small>

                    </div>
                </div>
        </a>`
        
    };
    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_PRICE, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_SOLD);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

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

        showProductsList();
    });

});