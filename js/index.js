
// Que el término buscado tenga al menos 3 caracteres. Si no los tiene avisar por pantalla al usuario.
// Los mensajes de error deben desaparecer si el usuario vuelve a entrar al campo de búsqueda.

// FORMULARIO
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



