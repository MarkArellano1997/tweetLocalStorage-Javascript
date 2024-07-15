const formulario = document.querySelector('#formulario')
const listaTweets = document.querySelector('#lista-tweets')
let tweets = []

evenListener()

function evenListener() {

    formulario.addEventListener('submit', agregarTweet)

    document.addEventListener('DOMContentLoaded',loadLocalStorage())
}

function agregarTweet(e) {

    e.preventDefault()

    const tweet = document.querySelector('#tweet').value
    if (tweet === '') {
        MostrarError('El Tweet no puede ir vació')
        return
    }
   
    const tweetObj = {
        id: Date.now(),
        tweet
    }

    tweets = [...tweets, tweetObj]

    saveLocalStorage()

    crearHtml()

}

function crearHtml() {

    limpiarHtml()

    tweets.forEach(tweet =>{
        const li = document.createElement('LI')
        const btnEliminar = document.createElement('A')
        li.textContent = tweet.tweet
        btnEliminar.classList.add('borrar-tweet')
        btnEliminar.textContent = 'X'

        btnEliminar.onclick = ()=>eliminarTweet(tweet.id)

        li.appendChild(btnEliminar)

        listaTweets.appendChild(li)
    })

    formulario.reset()
}

function limpiarHtml() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild)
    }
}

function MostrarError(mensaje) {

    const error = document.createElement('DIV')
    error.classList.add('error')
    error.innerText = mensaje

    formulario.appendChild(error)

    setTimeout(() => {
        error.remove()
    }, 3000);
}

function saveLocalStorage() {
    localStorage.setItem('tweets',JSON.stringify(tweets))
}

function loadLocalStorage() {
    tweets = JSON.parse(localStorage.getItem('tweets'))
    
    crearHtml()
}

function eliminarTweet(id) {

    tweets = tweets.filter(tweet => tweet.id !== id)

    saveLocalStorage()
    crearHtml()
}