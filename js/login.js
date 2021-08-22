//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){


});

function Login(){ 
    var done=0; 
    var usuario=document.getElementById("usuario").value;
    var password=document.getElementById("password").value; 
    if ((usuario.length >= 6 && usuario.length <= 8) && (password.length >= 6 && password.length <= 8)){ 
    window.location ="home.html";
    return false
    } 
    else{
        alert("usuario o contraseña invalido");
        window.location = "index.html"
    }
    } 
