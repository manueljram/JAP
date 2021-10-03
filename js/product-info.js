function showCarousell(array){

    let htmlContentToAppend = "";
    htmlContentToAppend += `<div class="row">
                                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">`
    for(let i = 0; i < array.length; i++){

        if (i === 0){
            htmlContentToAppend +=`<ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>`
        }
        else{
            htmlContentToAppend +=`<li data-target="#carouselExampleIndicators" data-slide-to="${i}"></li>`
        }

        
    }
    htmlContentToAppend += `</ol>`
    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];
        if (i === 0){
            htmlContentToAppend += `
            <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="${imageSrc}" class="d-block w-100" alt="image${i}">
                            </div>
            `
        }
        else{
            htmlContentToAppend += `
            <div class="carousel-item">
                                <img src="${imageSrc}" class="d-block w-100" alt="image${i}">
                            </div>
            `
        }
    }
    htmlContentToAppend += `</div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
    </a>
                            </div>
                            </div>`
    document.getElementById("firstcol").innerHTML = htmlContentToAppend;
}

function showPrice(array){
    let htmlContentToAppend = `<div class="row" style="margin-left: 5%; margin-top: 1%;">
        <h3>${array.currency + array.cost}</h3>
    
            </div>
            <div class="row align-items-start" style="margin-left: 5%;">
                <p>vendidos: ${array.soldCount}</p>
            </div>
            </div>
            <div class="col-lg-1 col-md-1">

            </div>
`;
    document.getElementById("firstcol").innerHTML += htmlContentToAppend;

}

function showInfo(array){
    let htmlContentToAppend =`<div class="row">
                                <h3 style="position: relative; width:auto; top: 0; text-align: center;">${array.name}</h3>
                                </div>
                            <div class="row">
                                <p>${array.description}</p>
                            </div>`;
    document.getElementById("secondcol").innerHTML += htmlContentToAppend;
}

function drawStars(stars){

    let number = parseInt(stars);
    let html="";
    for(let i =1; i<=number;i++){
        html +=`<span class="fa fa-star checked"></span>`

    }
    for(let j=number+1;j<=5;j++){
        html +=`<span class="fa fa-star"></span>`
    }    
    return html;

}

function showComments(array){
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        if ( i === 0 ){
            htmlContentToAppend += `<div class="card">
            <div class="card-header" id="heading${i}">
            <p style="text-align: right;">${array[i].dateTime}</p>
              <h2 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                ${array[i].user}&nbsp&nbsp<small>${drawStars(array[i].score)}</small>
                </button>
              </h2>
              
            </div>
        
            <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
              <div class="card-body">
              ${array[i].description}
              </div>
            </div>
          </div>`
        }
        else{
            htmlContentToAppend += `<div class="card">
            <div class="card-header" id="heading${i}">
            <p style="text-align: right;">${array[i].dateTime}</p>
              <h2 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
                ${array[i].user}&nbsp&nbsp<small>${drawStars(array[i].score)}</small>
                </button>
              </h2>
              
            </div>
        
            <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
              <div class="card-body">
              ${array[i].description}
              </div>
            </div>
          </div>`
        }
    }
    document.getElementById("accordionExample").innerHTML += htmlContentToAppend;
}

let commentCount = 5

function addComment(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy + "---" +  today.getHours() + ":"  
    + today.getMinutes();
    
    var comentario=document.getElementById("textarea").value;
    var score = document.getElementById("score").value;
    var htmlContentToAppend =`<div class="card">
    <div class="card-header" id="heading${commentCount}">
    <p style="text-align: right;">${today}</p>
      <h2 class="mb-0">
        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${commentCount}" aria-expanded="false" aria-controls="collapse${commentCount}">
        ${localStorage.getItem("usuario")}&nbsp&nbsp<small>${drawStars(score)}</small>
        </button>
      </h2>
      
    </div>

    <div id="collapse${commentCount}" class="collapse" aria-labelledby="heading${commentCount}" data-parent="#accordionExample">
      <div class="card-body">
      ${comentario}
      </div>
    </div>
  </div>`
    document.getElementById("accordionExample").innerHTML += htmlContentToAppend;
    document.getElementById("textarea").value ="";
    commentCount += 1
}


function showRelatedProducts(array, related){
    let htmlContentToAppend ="";
    for (let i = 0; i <= related.length -1; i++){
        current = related[i]
        for (let i = 0; i <= array.length -1; i++){
            if (current === i){
                let product = array[i];
                htmlContentToAppend += `<a href="product-info.html"><div class="col-md-3 col-sm-4 col-5">
                                            <div class="card" style="width: 10rem;">
                                                <img src="${product.imgSrc}" class="card-img-top" alt="imagen de auto">
                                                <div class="card-body">
                                                    <h4 class="card-text">${product.name}</h4>
                                                    <p><b>U$S.${product.cost}</b></p>
                                                    <small>vendidos: ${product.soldCount}</small>
                                                </div>
                                            </div>
                                        </div></a>`
            }
            else{
                continue
            }
        } 
    }
    document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            arrayProducts = resultObj.data;
            getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
                if (resultObj.status === "ok")
                {
                    arrayRelated = resultObj.data.relatedProducts;
                    showRelatedProducts(arrayProducts, arrayRelated);
                }
            });
            

        }
        
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            // comments = resultObj.data;
            showComments(resultObj.data);

        }
    });

    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;
            arrayRelated = product.relatedProducts;

            
            document.getElementById("breadcrumb").innerHTML+= `<li class="breadcrumb-item active" aria-current="page">${product.name}</li>`
            showCarousell(product.images);
            showPrice(product);
            showInfo(product);
        }
        
    });
    
    
    
});