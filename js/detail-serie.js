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
    }) } else if (buscador.value.length < 3){
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
        
        if (data.results.AR == null){
            plataformas.innerHTML += "No se encontraron plataformas"
        }else{
            for(let i = 0; i<data.results.AR.flatrate.length; i ++)
                plataformas.innerHTML += data.results.AR.flatrate[i].provider_name + ", "
        }
    })
    .catch(function(error) {
        console.log("Error: " + error);
    })

// TRAILER
let urlTrailer = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=35664717fe783f635e22f58af930e36f&language=en-US`

fetch(urlTrailer)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data);
        listaTrailers = document.querySelector(".trailer-serie")
        dr = data.results
        urlvideo = "https://www.youtube.com/embed/"
        listaTrailers.innerHTML = `<iframe width="560" height"315" src=${urlvideo + dr[0].key} allowfullscreen </iframe>`
        console.log(listaTrailers.innerHTML)
    })
    .catch(function(error) {
        console.log("Error: " + error);
    })

//REVIEWS
let urlReviews = `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=35664717fe783f635e22f58af930e36f&language=en-US&page=1`

fetch(urlReviews)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data);
        listaReviews = document.querySelector(".reviews-serie")
        dr = data.results
        for(let i=0; i<2; i++)
        listaReviews.innerHTML += `<article class = "reviews-serie" >
                                    <h2>Reseñas</h2>
                                    <p><span>De: </span>${dr[i].author} </p>
                                    <p><span>Reseña: </span>${dr[i].content}
                                 </article>`
    })                          
    .catch(function(error) {
        console.log("Error: " + error);
    })


//FAVORITOS
let favoritosSeries = []

// Esto es para saber si ya hay datos de favoritos
    //Recupero el local storage con la propiedad "pelisfavoritas"
let recuperoStorageSeries = localStorage.getItem("seriesfavoritas")
    // Si hay algo en el local storage, lo tranformo en array y lo guardo en favoritos
if(recuperoStorageSeries !== null){
    favoritosSeries = JSON.parse(recuperoStorageSeries) 
}
    // Para cambiar el texto del boton si el id ya esta en favoritos
let botonfavs = document.querySelector(".logo-favoritos");
if (favoritosSeries.includes(id)){
    botonfavs.innerText = "Sacar de Favoritos"
}
botonfavs.addEventListener("click", function(){

    if(favoritosSeries.includes(id)){
        let indiceSerie = favoritosSeries.indexOf(id); //Indexof  retorna en que indice del array se encuentra el elemento
        favoritosSeries.splice(indiceSerie,1)  // Splice elimina elementos existentes del array (indice,cantidad elementos a borrar)
        botonfavs.innerText = "Agregar a Favoritos"
    } else {
        favoritosSeries.push(id) // Al array de favoritos le sumamos el id de la pelicula que agregamos como favs. 
        botonfavs.innerText = "Sacar de Favoritos";

    }
    // Guardando datos en el Local Storage. 
        // Primero paso el array de favoritos a formato JSON con .stringify
    let favs = JSON.stringify(favoritosSeries)
        //Con el metodo "setItem" agrego la propiedad "pelisfavoritas" y el valor "favs" que seria el array de favoritos al local storage
    localStorage.setItem("seriesfavoritas",favs)
    console.log(localStorage)
    
})
