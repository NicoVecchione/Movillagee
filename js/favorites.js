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

let listaFavs = document.querySelector(".FavsPelis")

if(peliculas == null){
    listaFavs.innerHTML = `<p> No tenes Favoritos </p>`
} else {
    for(let i=0; i<peliculas.length; i++){
        buscarYMostrarFavoritos(peliculas[i])
    }
}

function buscarYMostrarFavoritos(id){

    let url = `https://api.themoviedb.org/3/account/${id}/favorite/movies?api_key=35664717fe783f635e22f58af930e36f&language=en-US&sort_by=created_at.asc&page=1`
    let url2 = `https://api.themoviedb.org/3/movie/${id}?api_key=e3f1ae8bae04c04c63af7b6996decd02&language=en-US`
    fetch(url2)
    .then(function(res){
        return res.json()
    })
    .then(function(data){
        console.log(data);
        let clave = data.results
        let urlimg = "https://image.tmdb.org/t/p/original"
        listaFavs += `<article class= "Favstodas">
                        <a href="detail-movie.html?id=${id}"><img class="pelisFavs" src=${urlimg + poster_path} alt=${original_title}></a>
                        <strong> ${original_title} </strong>
                        <p> ${release_date} </p>
                     </article>`
    })
    .catch(function(e){
        console.log(e)
    })

}