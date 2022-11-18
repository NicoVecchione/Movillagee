let url_detailMovie = "https://api.themoviedb.org/3/movie/{movie_id}?api_key=35664717fe783f635e22f58af930e36f&language=en-US"

fetch(url_detailMovie)
    .then(function(res){
        return response.json()

    })
    .then(function(data) {
        console.log(data);
        let url_imagen = "https://image.tmdb.org/t/p/original"
        let detalles = document.querySelector(".contenedor-texto")
        let detalles_pelis = ``

        for (let i=0; i<2; i++){
            detalles_pelis += `<div class="contenedor-texto">
            
            `
        }
        detalles.innerHTML = detalles_pelis
        
    })
    .catch(function(error) {
        console.log("Error: " + error);
    })
