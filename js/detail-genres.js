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

// DETALLE GENEROS

let queryString = location.search;
console.log(queryString)

let queryStringObj = new URLSearchParams(queryString);

let id = queryStringObj.get('id');
console.log(id);

let url_generosPelis = `https://api.themoviedb.org/3/discover/movie?api_key=35664717fe783f635e22f58af930e36f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${id}&with_watch_monetization_types=flatrate`

fetch(url_generosPelis)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data);
        let generos = document.querySelector(".genero-accion")
        let peliculas = ""

        for (let i=0; i<15; i++){
            console.log(data.results[i])
            peliculas += `<article class="peli-accion">
                                <a href="detail-movie.html?id=${data.results[i].id}">
                                    <img class="img-accion" src="https://image.tmdb.org/t/p/original${data.results[i].poster_path}">
                                </a>
                                    <p id="titulo-peli">${data.results[i].title}</p>
                          </article>`
        }
        console.log(peliculas)
        generos.innerHTML = peliculas
    })
    .catch(function(error) {
        console.log("Error: " + error);
    })

// ERROR
