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
        let contenedor_imagen = document.querySelector(".contenedor-imagen")
        contenedor_imagen.innerHTML = `<img class="imagen" src="${url_imagen + data.poster_path}">`

        let titulo_peli = document.querySelector("#titulo-peli")
        titulo_peli.innerHTML = data.title
        
        let rating = document.querySelector("#rating")
        rating.innerHTML += data.vote_average

        let año_estreno = document.querySelector("#año-estreno")
        año_estreno.innerHTML += data.release_date

        let info_peli = document.querySelector("#sinopsis")
        info_peli.innerHTML += data.overview

        let genero = document.querySelector("#genero")
        for(let i of data.genres){
            genero.innerHTML += `<a href="detail-genres.html?id=${i.id}">
            ${i.name}</a> `
        }
        
        let duracion = document.querySelector("#duracion")
        duracion.innerHTML += data.runtime + " minutos"

        let edad = document.querySelector("#edad")
        if (data.adult === true){
            edad.innerHTML = "+18"
        } else{
            edad.innerHTML = "ATP"
        }

    })
    .catch(function(error) {
        console.log("Error: " + error);
    })

let url2 = "https://api.themoviedb.org/3/movie/{movie_id}/watch/providers?api_key=35664717fe783f635e22f58af930e36f"

fetch(url2)
    .then(function(response){
        return response.json()

    })
    .then(function(data) {
        console.log(data);
        let 

    })
    .catch(function(error) {
        console.log("Error: " + error);
    })
