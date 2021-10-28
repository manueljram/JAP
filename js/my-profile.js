let datos = null

let profile ={
    nombre: "",
    apellido: "",
    edad:"",
    email:"",
    numero:"",
}


function showProfile(){
    if (datos === null){
        datos = profile;
    }
    document.getElementById("name").innerHTML= datos.nombre
    document.getElementById("nameEdit").value= datos.nombre
    document.getElementById("name").innerHTML += " " + datos.apellido
    document.getElementById("lastnameEdit").value= datos.apellido
    document.getElementById("age").innerHTML = datos.edad
    document.getElementById("ageEdit").value= datos.edad
    document.getElementById("email").innerHTML = datos.email
    document.getElementById("emailEdit").value= datos.email
    document.getElementById("phone").innerHTML = datos.numero
    document.getElementById("phoneEdit").value= datos.numero

    console.log(datos)
}

function updateData(){
    datos.nombre = document.getElementById("nameEdit").value;
    datos.apellido = document.getElementById("lastnameEdit").value;
    datos.edad = document.getElementById("ageEdit").value;
    datos.email = document.getElementById("emailEdit").value;
    datos.numero = document.getElementById("phoneEdit").value;
    console.log(datos)
    localStorage.setItem("perfil", JSON.stringify(datos));
    showProfile()
    
}

document.addEventListener("DOMContentLoaded", function (e) {
    // localStorage.removeItem("perfil")
    datos = JSON.parse(localStorage.getItem("perfil"));
    console.log(datos)
    showProfile()
    
});