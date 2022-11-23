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

// FAVORITOS PELIS
let recuperoStoragePelis = localStorage.getItem("pelisfavoritas")
let peliculas = JSON.parse(recuperoStoragePelis)
console.log(peliculas)

let listaFavsPeli = document.querySelector(".FavsPelis")

// Me fijo si el array tiene elementos (pelis)
if(peliculas == null || peliculas.length == 0){
    //Si no hay favoritos
    listaFavsPeli.innerHTML = `<span class= firulete> No tenes Favoritos </span>`
} else {
    //Si hay favoritos
    for(let i=0; i<peliculas.length; i++){ // El for va a ir recorriendo cada posicion del array y le aplica la funcion
        buscarYMostrarPelis(peliculas[i]) // peliculas [i] es = "id"
    }
}

function buscarYMostrarPelis(id){ 

    let urlPeli = `https://api.themoviedb.org/3/movie/${id}?api_key=e3f1ae8bae04c04c63af7b6996decd02&language=en-US`
    fetch(urlPeli)
    .then(function(res){
        return res.json()
    })
    .then(function(data){
        console.log(data);
        let urlimg = "https://image.tmdb.org/t/p/original"
        listaFavsPeli.innerHTML += `<article class= "popu">
                        <a href="detail-movie.html?id=${data.id}"><img class="pelis" src=${urlimg + data.poster_path} alt=${data.title}></a>
                        <strong> ${data.title} </strong>
                        <p class= "estreno"> ${data.release_date} </p>
                     </article>`
    })
    .catch(function(e){
        console.log(e)
    })

}
//FAVORITOS SERIES
let recuperoStorageSeries = localStorage.getItem("seriesfavoritas")
let series = JSON.parse(recuperoStorageSeries)
console.log(series)

let listaFavsSerie = document.querySelector(".FavsSeries")

// Me fijo si el array tiene elementos (series)
if(series == null || series.length == 0){
    //Si no hay favoritos
    listaFavsSerie.innerHTML = `<span class= firulete> No tenes Favoritos </span>`
} else {
    //Si hay favoritos
    for(let i=0; i<series.length; i++){ // El for va a ir recorriendo cada posicion del array y le aplica la funcion
        buscarYMostrarSeries(series[i]) // series [i] es = "id"
    }
}

function buscarYMostrarSeries(id){ 

    let urlSerie = `https://api.themoviedb.org/3/tv/${id}?api_key=35664717fe783f635e22f58af930e36f&language=en-US`
    fetch(urlSerie)
    .then(function(res){
        return res.json()
    })
    .then(function(data){
        console.log(data);
        let urlimg = "https://image.tmdb.org/t/p/original"
        listaFavsSerie.innerHTML += `<article class= "popu">
                        <a href="detail-movie.html?id=${data.id}"><img class="pelis" src=${urlimg + data.poster_path} alt=${data.name}></a>
                        <strong> ${data.name} </strong>
                        <p class= "estreno"> ${data.first_air_date} </p>
                     </article>`
    })
    .catch(function(e){
        console.log(e)
    })

} 