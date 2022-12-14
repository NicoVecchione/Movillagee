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

//DETALLE PELICULA

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
        for(let i=0; i<data.genres.length; i++){
            genero.innerHTML += `<a href="detail-genres.html?id=${data.genres[i].id}">
            ${data.genres[i].name}</a> `
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
        console.log(data);
        let plataformas = document.querySelector("#plataformas");
        
        if (data.results.AR == null){
            plataformas.innerHTML += "No se encontraron plataformas"
        }else{
            for(let i = 0; i<data.results.AR.flatrate.length; i ++){
                plataformas.innerHTML += data.results.AR.flatrate[i].provider_name + ", "
            }
        }
    })
    .catch(function(error) {
        console.log("Error: " + error);
    })

// TRAILER
let urlTrailer = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=35664717fe783f635e22f58af930e36f&language=en-US`

fetch(urlTrailer)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data);
        listaTrailers = document.querySelector(".trailer-movie")
        dr = data.results
        urlvideo = "https://www.youtube.com/embed/"
        listaTrailers.innerHTML = `<iframe width="300" height"300" src=${urlvideo + dr[0].key} allowfullscreen </iframe>`
        console.log(listaTrailers.innerHTML)
    })
    .catch(function(error) {
        console.log("Error: " + error);
    })


//GET RECOMMENDATIONS

let url_recomendaciones = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=35664717fe783f635e22f58af930e36f&language=en-US&page=1`

fetch(url_recomendaciones)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data);
        console.log(data.results);

        let listaRecomendaciones = []
        console.log(listaRecomendaciones);
        let capturo = document.querySelector(".nom-recom-container2")

        for(let i=0; i<4; i++){
            listaRecomendaciones += `<section class="nom-recom">
                <a href= "./detail-movie.html?id=${data.results[i].id}">
                    <img class="img" src="https://image.tmdb.org/t/p/original${data.results[i].poster_path}" alt="${data.results[i].title}">
                    <button id="button">(${data.results[i].title})</button>
                </a>
            </section>`
        }
        capturo.innerHTML = listaRecomendaciones
        
        let getRecom = document.querySelector("#button")
        console.log(getRecom);
        let contenedor = document.querySelector(".nom-recom-container2") 
        
        getRecom.addEventListener("click",function(){
            if (getRecom.innerText == "Ver recomendaciones") {
                contenedor.style.display = "flex";
                this.innerText = "Ocultar recomendaciones";
            }else{
                contenedor.style.display = "none";
                this.innerText = "Ver recomendaciones"
            }
        })
    })
    .catch(function(error) {
        console.log("Error: " + error);
    })

//REVIEWS
let urlReviews = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=35664717fe783f635e22f58af930e36f&language=en-US&page=1`

fetch(urlReviews)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data);
        listaReviews = document.querySelector(".reviews")
        dr = data.results
        for(let i=0; i<1; i++)
        listaReviews.innerHTML += `<section class="reviews">
                                    <h2>Reseña</h2>
                                    <p><span>Reseña de: </span>${dr[i].author}</p>
                                    <p><span>Reseña: </span>${dr[i].content}</p>
                                 </section>`
    })                          
    .catch(function(error) {
        console.log("Error: " + error);
    })

//FAVORITOS

let favoritosPeli = []

// Esto es para saber si ya hay datos de favoritos
    //Recupero el local storage con la propiedad "pelisfavoritas"
let recuperoStoragePelis = localStorage.getItem("pelisfavoritas")
    // Si hay algo en el local storage, lo tranformo en array y lo guardo en favoritos
if(recuperoStoragePelis !== null){
    favoritosPeli = JSON.parse(recuperoStoragePelis) 
}
    // Para cambiar el texto del boton si el id ya esta en favoritos
let botonfavs = document.querySelector(".logo-favoritos");
if (favoritosPeli.includes(id)){
    botonfavs.innerText = "Sacar de Favoritos"
}
botonfavs.addEventListener("click", function(){

    if(favoritosPeli.includes(id)){
        let indicePeli = favoritosPeli.indexOf(id);
        favoritosPeli.splice(indicePeli,1)
        botonfavs.innerText = "Agregar a Favoritos"
    } else {
        favoritosPeli.push(id) // Al array de favoritos le sumamos el id de la pelicula que agregamos como favs. 
        botonfavs.innerText = "Sacar de Favoritos";

    }
    // Guardando datos en el Local Storage. 
        // Primero paso el array de favoritos a formato JSON con .stringify
    let favs = JSON.stringify(favoritosPeli)
        //Con el metodo "setItem" agrego la propiedad "pelisfavoritas" y el valor "favs" que seria el array de favoritos al local storage
    localStorage.setItem("pelisfavoritas",favs)
    console.log(localStorage)
    
})

