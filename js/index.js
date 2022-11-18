// FORMULARIO
// Que el término buscado tenga al menos 3 caracteres. Si no los tiene avisar por pantalla al usuario.
// Los mensajes de error deben desaparecer si el usuario vuelve a entrar al campo de búsqueda.
let buscador = document.querySelector(".buscador")

// Que no se mande si no hay nada en el campo
let formulario = document.querySelector(".busqueda")
formulario.addEventListener("submit", function(event){
    event.preventDefault()
    if(buscador.value == ""){
        alert("Complete la busqueda para iniciarla")
    } else {
        this.submit()
    }
})


// ULTIMOS LANZAMIENTOS
let url_lanzamiento = "https://api.themoviedb.org/3/movie/top_rated?api_key=e3f1ae8bae04c04c63af7b6996decd02&language=en-US&page=1"

fetch(url_lanzamiento)
    .then(function(res){
        return res.json()
    })
    .then(function(data){
        console.log(data);
        let todos_lanzamientos = data.results
        let lanzamientos = document.querySelector(".lanzamientos");
        let urlimg = "https://image.tmdb.org/t/p/original"
        let pelis_lanzamientos = [];

        for(let i=0; i<todos_lanzamientos.length; i++){
            pelis_lanzamientos += `<article class= "popu">
                                            <a href="detalle.html?id=${todos_lanzamientos[i].id}"><img class="pelis" src=${urlimg + todos_lanzamientos[i].poster_path} alt=${todos_lanzamientos[i].original_title}></a>
                                            <p> ${todos_lanzamientos[i].original_title} </p>
                                            <p class="estreno"> ${todos_lanzamientos[i].release_date} </p>
                                    </article>`
                                        
        }
        lanzamientos.innerHTML = pelis_lanzamientos;

    })
    .catch(function(e){
        console.log(e)
    })

// SERIES POPULARES
let url_SeriePopu = "https://api.themoviedb.org/3/tv/popular?api_key=35664717fe783f635e22f58af930e36f&language=en-US&page=1"

fetch(url_SeriePopu)
    .then(function(res){
        return res.json()
    })
    .then(function(data){
        console.log(data);
        let todos_SeriePopu = data.results
        let PopuSeries = document.querySelector(".seriePopulares");
        let urlimg = "https://image.tmdb.org/t/p/original"
        let series_populares = [];

        for(let i=0; i<todos_SeriePopu.length; i++){
            series_populares += `<article class= "popu">
                                            <a href="detalle.html?id=${todos_SeriePopu[i].id}"><img class="pelis" src=${urlimg + todos_SeriePopu[i].poster_path} alt=${todos_SeriePopu[i].name}></a>
                                            <p> ${todos_SeriePopu[i].name} </p>
                                            <p class="estreno"> ${todos_SeriePopu[i].first_air_date} </p>
                                    </article>`
                                        
        }
        PopuSeries.innerHTML = series_populares;
    })
    .catch(function(e){
        console.log(e)
    })

// PELICULAS POPULARES
let url_PelisPopu = "https://api.themoviedb.org/3/movie/popular?api_key=35664717fe783f635e22f58af930e36f&language=en-US&page=1"

fetch(url_PelisPopu)
    .then(function(res){
        return res.json()
    })
    .then(function(data){
        console.log(data);
        let todos_PelisPopu = data.results
        let PeliSeries = document.querySelector(".pelisPopulares");
        let urlimg = "https://image.tmdb.org/t/p/original"
        let pelis_populares = [];

        for(let i=0; i<todos_PelisPopu.length; i++){
            pelis_populares += `<article class= "popu">
                                            <a href="detalle.html?id=${todos_PelisPopu[i].id}"><img class="pelis" src=${urlimg + todos_PelisPopu[i].poster_path} alt=${todos_PelisPopu[i].original_title}></a>
                                            <p> ${todos_PelisPopu[i].original_title} </p>
                                            <p class="estreno"> ${todos_PelisPopu[i].release_date} </p>
                                    </article>`
                                        
        }
        PeliSeries.innerHTML = pelis_populares;
    })
    .catch(function(e){
        console.log(e)
    })