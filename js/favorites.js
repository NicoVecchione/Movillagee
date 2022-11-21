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

// FAVORITOS
let recuperoStorage = localStorage.getItem("pelisfavoritas")
let peliculas = JSON.parse(recuperoStorage)
console.log(peliculas)

let listaFavs = document.querySelector(".FavsPelis")

// Me fijo si el array tiene elementos (pelis)
if(peliculas == null || peliculas.length == 0){
    //Si no hay favoritos
    listaFavs.innerHTML = `<span class= firulete> No tenes Favoritos </span>`
} else {
    //Si hay favoritos
    for(let i=0; i<peliculas.length; i++){ // El for va a ir recorriendo cada posicion del array y le aplica la funcion
        buscarYMostrarFavoritos(peliculas[i]) // peliculas [i] es = a "id"
    }
}

function buscarYMostrarFavoritos(id){ 

    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=e3f1ae8bae04c04c63af7b6996decd02&language=en-US`
    fetch(url)
    .then(function(res){
        return res.json()
    })
    .then(function(data){
        console.log(data);
        let urlimg = "https://image.tmdb.org/t/p/original"
        listaFavs.innerHTML += `<article class= "popu">
                        <a href="detail-movie.html?id=${data.id}"><img class="pelis" src=${urlimg + data.poster_path} alt=${data.title}></a>
                        <strong> ${data.title} </strong>
                        <p class= "estreno"> ${data.release_date} </p>
                     </article>`
    })
    .catch(function(e){
        console.log(e)
    })

}

