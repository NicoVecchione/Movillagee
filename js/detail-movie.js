// FORMULARIO

let buscador = document.querySelector(".buscador")

let formulario = document.querySelector(".busqueda")
let error = document.querySelector(".error")
formulario.addEventListener("submit", function(event){
    event.preventDefault()
    // Que no se mande si no hay nada en el campo
    if(buscador.value == ""){
        error.innerText ="Complete la busqueda!"
            // Mensaje de error desaparece
            buscador.addEventListener("focus", function(){
                error.innerText = null
    // Que tenga al menos 3 caracteres
    }) } else if (buscador.value.length < 3 && buscador.value !== ""){
        error.innerText= "Debe introducir minimo 3 caracteres";
            // Mensaje de error desaparece
            buscador.addEventListener("focus", function(){
                error.innerText = null
    }) } else {
        this.submit()
    }
})
let queryString = location.search
let qsObject = new URLSearchParams(queryString)
let id = qsObject.get('id')

let url = `https://api.themoviedb.org/3/movie/${id}?api_key=e3f1ae8bae04c04c63af7b6996decd02&language=en-US`

fetch(url)
    .then(function(response){
        return response.json()

    })
    .then(function(data) {
        console.log(data);
        let url_imagen = "https://image.tmdb.org/t/p/original"
        let contenedor_imagen = document.querySelector(".contenedor-imagen");
        contenedor_imagen.innerHTML = `<img class="imagen" src="${url_imagen + data.poster_path}">`

        let titulo_peli = document.querySelector("#titulo-peli");
        titulo_peli.innerText = data.title
        
        let rating = document.querySelector("#rating");
        rating.innerHTML += data.vote_average

        let año_estreno = document.querySelector("#año-estreno");
        año_estreno.innerHTML += data.release_date

        let info_peli = document.querySelector("#sinopsis");
        info_peli.innerHTML += data.overview

        let genero = document.querySelector("#genero");
        for(let i of data.genres){
            genero.innerHTML += `<a href="detail-genres.html?id=${i.id}">
            ${i.name}</a> `
        }
        
        let duracion = document.querySelector("#duracion");
        duracion.innerHTML += data.runtime + " minutos"

        let edad = document.querySelector("#edad")
        if (data.adult === true){
            edad.innerText = "+18"
        } else{
            edad.innerText = "ATP"
        }

        
    })
    .catch(function(error) {
        console.log("Error: " + error);
    })

let url_plataformas = `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=35664717fe783f635e22f58af930e36f`

fetch(url_plataformas)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        let plataformas = document.querySelector("#plataformas");
        console.log(data);
        
        if (data.results.AR == undefined){
            plataformas.innerHTML += "No se encontraron plataformas"
        }else{
            for(let i = 0; i<data.results.AR.flatrate.length; i ++)
                plataformas.innerHTML += data.results.AR.flatrate[i].provider_name + ", "
        }
    })
    .catch(function(error) {
        console.log("Error: " + error);
    })

//FAVORITOS
let favoritos = []

let recuperoStorage = localStorage.getItem("pelisfavoritas")
if(recuperoStorage){
    favoritos = JSON.parse(recuperoStorage) 
}

let botonfavs = document.querySelector(".logo-favoritos");

if (favoritos.includes(id)){
    botonfavs.innerText = "Sacar de Favoritos"
}
botonfavs.addEventListener("click", function(){

    if(favoritos.includes(id)){
        let indicePeli = favoritos.indexOf(id);
        favoritos.splice(indicePeli,1)
        botonfavs.innerText = "Agregar a Favoritos"
    } else {
        favoritos.push(id) // Al array de favoritos le sumamos el id de la pelicula que agregamos como favs. 
        botonfavs.innerText = "Sacar de Favoritos";

    }

    let favs = JSON.stringify(favoritos)
    localStorage.setItem("pelisfavoritas",favs)
    console.log(localStorage)
    
})
