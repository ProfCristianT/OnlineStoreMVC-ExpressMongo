document.querySelectorAll(".btn-borrar")
    .forEach(btn => btn.addEventListener("click", async ev =>{
        const userId = btn.getAttribute("userid")
        
        const ok = confirm(`¿Desea eliminar el usuario ${userId}?`)

        if(ok){
            const response = await fetch("http://localhost:8080/api/users/"+userId, {method: "DELETE"})

            const rta = await response.json()
            
            if(rta.deletedCount > 0){
                location.reload()
            }
        }
    }))