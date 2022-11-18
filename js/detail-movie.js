let queryString = location.search

let qsObject = new (location.search)



//endpoint con el id de la qs
let url_detailMovie = "https://api.themoviedb.org/3/movie/{movie_id}?api_key=35664717fe783f635e22f58af930e36f&language=en-US"

//fetch
fetch(url_detailMovie)
    .then(function(res){
        return response.json()

    })
    .then(function(data) {
        console.log(data);
        let     
    })
    .catch(function(error) {
        console.log("Error: " + error);
    })
