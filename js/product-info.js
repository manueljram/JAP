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

function showComments(array){
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        htmlContentToAppend += `<div class="card p-3 mb-2">
        <div class="d-flex flex-row"> <img src="https://i.imgur.com/dwiGgJr.jpg" height="40" width="40" class="rounded-circle">
            <div class="d-flex flex-column ms-2">
                <h6 class="mb-1 text-primary">${array[i].user}</h6>
                <p class="comment-text">${array[i].description}</p>
            </div>
        </div>
        <div class="d-flex justify-content-between">
            <div class="d-flex flex-row gap-3 align-items-center">
                <div class="d-flex align-items-center"> <i class="fa fa-heart-o"></i> <span class="ms-1 fs-10">Like</span> </div>
                <div class="d-flex align-items-center"> <i class="fa fa-comment-o"></i> <span class="ms-1 fs-10">Comments</span> </div>
            </div>
            <div class="d-flex flex-row"> <span class="text-muted fw-normal fs-10">May 22,2020 12:10 PM</span> </div>
        </div>
    </div>`
    }
    document.getElementById("comments").innerHTML += htmlContentToAppend;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            category = resultObj.data;

            
            document.getElementById("breadcrumb").innerHTML+= `<li class="breadcrumb-item active" aria-current="page">${category.name}</li>`
            showCarousell(category.images);
            showPrice(category);
            showInfo(category);
        }
    });

});