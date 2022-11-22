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

// GENEROS

let url_genrePelis = `https://api.themoviedb.org/3/genre/movie/list?api_key=35664717fe783f635e22f58af930e36f&language=en-US`

fetch(url_genrePelis)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data);

        let info = data.genres

        let generos = document.querySelector(".generos")

        let peliculas = ""

        for (let i=0; i<data.genres.length; i++){
            console.log(info[i])
            peliculas += `<article class="generos-container">
                                <p class="titulos-genero"><a href="./detail-genres.html?id=${info[i].id}&name=${info[i].name}">${info[i].name}</a></p>
                          </article>`
        }
        generos.innerHTML = peliculas
    })
    .catch(function(error) {
        console.log("Error: " + error);
    })
