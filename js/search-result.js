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

// Resultados Pelicula
let qs = location.search
let qsObjLit = new URLSearchParams(qs);
let buscar = qsObjLit.get('Buscador');
console.log(buscar);

let url_searchPelis = `https://api.themoviedb.org/3/search/movie?query=${buscar}&api_key=35664717fe783f635e22f58af930e36f&language=en-US&page=1&include_adult=false`

fetch(url_searchPelis)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data);
        
        let seccionBuscador= document.querySelector(".seccionBuscador");
        let mensaje = document.querySelector(".mensajeBuscador")

        if(data.results.length == 0){
            mensaje.innerHTML = `No se ha encontrado resultado de busqueda para:  <span> ${buscar}</span>`
        }
        else{
            mensaje.innerHTML = `Resultado de busqueda para:  <span>${buscar}</span>`
            for(let i=0; i<2; i++){    //Mostramos 2 pelis
                seccionBuscador.innerHTML += `<article class="popu">
                    <a href="./detail-movie.html?id=${data.results[i].id}"><img class="pelis" src= "https://image.tmdb.org/t/p/w500${data.results[i].poster_path}" alt="">
                    </a>
                    <strong>${data.results[i].original_title}</strong>
                    <p class="estreno">${data.results[i].release_date}</p>
                </article>`
    
            }
        }
    })

    .catch(function(error){
        console.log("Error: " + error);
    })

// Resultado Series

let url_searchSeries = `https://api.themoviedb.org/3/search/tv?query=${buscar}&api_key=35664717fe783f635e22f58af930e36f&language=en-US&page=1&include_adult=false`

fetch(url_searchSeries)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data);
        let seccionBuscador = document.querySelector(".seccionBuscador");

        for(let i=0; i<2; i++){  //Mostramos 2 series
            seccionBuscador.innerHTML += `<article class="popu">
                <a href="./detail-serie.html?id=${data.results[i].id}"><img class="pelis" src= "https://image.tmdb.org/t/p/w500${data.results[i].poster_path}" alt=${data.results[i].original_name}>
                </a>
                <strong>${data.results[i].original_name}</strong>
                <p class="estreno">${data.results[i].first_air_date}</p>
            </article>`

        }
    })

    .catch(function(error){
        console.log("Error: " + error);
    })

