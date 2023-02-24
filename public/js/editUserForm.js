document.querySelector("#createUserForm").addEventListener("submit", ev => {
    ev.preventDefault()

    const formData = new FormData(ev.target)

    const userId = ev.target.userId.value
    //console.log(userId)

    const xhr = new XMLHttpRequest
    xhr.responseType = "json"
    xhr.open("PUT", "/api/users/"+userId)
    xhr.send(formData)

    xhr.addEventListener("load", ev => {
        //JSON.parse(ev.target.response)
        console.log(ev.target.response)
        const {status, id} = ev.target.response
        if(status){
            const modal = document.querySelector("#userCreatedModal")
            modal.style.display = "block"

            modal.querySelector("#userCreatedId").innerText = id
        }
    })
})

const hadleClickModal = ev => {
    location.href = "/user/getAll"
}

document.querySelector("#userCreatedModal .close")
    .addEventListener("click", hadleClickModal)
    
document.querySelector("#userCreatedModal .btn.aceptar")
    .addEventListener("click", hadleClickModal)
