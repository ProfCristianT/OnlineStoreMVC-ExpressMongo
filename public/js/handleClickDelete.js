const handleClickDelete = ev => {
    ev.preventDefault()

    const xhr = new XMLHttpRequest
    xhr.open("POST", ev.target.href )
    xhr.send()

    xhr.addEventListener("load", ev => {
        console.log(xhr.response)
    })
}

document.querySelectorAll(".btn.delete")
    .forEach( btn => {
        btn.addEventListener("click", handleClickDelete )
    } )