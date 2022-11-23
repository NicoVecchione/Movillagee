// FORMULARIO
var busqueda=window.location.search?.split("=")[1]
console.log (busqueda)
let contenedor=document.querySelector(".populares")
let buscador = document.querySelector(".buscador")
var resultado_de_busqueda=document.getElementById("resultado_de_busqueda")
let formulario = document.querySelector(".busqueda")
let error = document.querySelector(".error")
var error_busqueda=document.getElementById("Error")
if(busqueda){
    getMovieByName (busqueda).then (function(data){
        data.json().then(function(respuesta){
           contenedor.innerHTML=""
           if(respuesta.results.length===0){
        error_busqueda.style.display="block"
           }
           respuesta.results.forEach(pelicula => {
               contenedor.innerHTML+=`
               <article class="popu">
               <a href="./detail-movie.html"><img class="pelis" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="Spider"></a>
               <h3>${pelicula.title?pelicula.title:pelicula.name}</h3>
           </article>
               `
           });
   console.log(respuesta)
        })
         })
}
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
        let moviename=buscador.value   
     resultado_de_busqueda.textContent=moviename
      getMovieByName (moviename).then (function(data){
     data.json().then(function(respuesta){
        contenedor.innerHTML=""
        if(respuesta.results.length===0){
     error_busqueda.style.display="block"
        }
        respuesta.results.forEach(pelicula => {
            contenedor.innerHTML+=`
            <article class="popu">
            <a href="./detail-movie.html"><img class="pelis" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="Spider"></a>
            <h3>${pelicula.title?pelicula.title:pelicula.name}</h3>
        </article>
            `
        });
console.log(respuesta)
     })
      })
    }
})
function getMovieByName (moviename){
   return fetch ("https://api.themoviedb.org/3/search/multi?api_key=faebca224880d1a1cf1fe2cb4230ae6d&language=en-US&page=1&include_adult=false&query="+ moviename)

}