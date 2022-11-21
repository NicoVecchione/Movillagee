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

// DETALLE GENEROS

let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
let id = queryStringObj.get('id');

let url_pelis = "https://api.themoviedb.org/3/discover/movie?api_key=35664717fe783f635e22f58af930e36f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate"

fetch(url_pelis)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data);
        let titulo_genero = document.querySelector(".titulo-genero")
        titulo_genero.innerText = data.results
    })
    .catch(function(error) {
        console.log("Error: " + error);
    })


let url_series = "https://api.themoviedb.org/3/discover/tv?api_key=35664717fe783f635e22f58af930e36f&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0"