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

// DETALLE SERIE

let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
let id = queryStringObj.get('id');

let url = `https://api.themoviedb.org/3/tv/${id}?api_key=35664717fe783f635e22f58af930e36f&language=en-US`

fetch(url)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data);
        let url_imagen = "https://image.tmdb.org/t/p/original"
        let contenedor_imagen = document.querySelector(".contenedor-imagen")
        contenedor_imagen.innerHTML = `<img class="imagen2" src="${url_imagen + data.poster_path}">`

        let titulo_serie = document.querySelector("#titulo-serie")
        titulo_serie.innerText = data.name

        let rating = document.querySelector("#rating")
        rating.innerHTML += data.vote_average

        let estreno = document.querySelector("#año-estreno")
        estreno.innerHTML += data.first_air_date
        
        let info_serie = document.querySelector("#sinopsis")
        info_serie.innerHTML += data.overview

        let genero = document.querySelector("#generos")
        for(let i=0; i<data.genres.length; i++){
            genero.innerHTML += `<a href="detail-genres.html?id=${data.genres[i].id}">
            ${data.genres[i].name}</a> `
        }
        
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

let url_plataformas = `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=35664717fe783f635e22f58af930e36f`

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