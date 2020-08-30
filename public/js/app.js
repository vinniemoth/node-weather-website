const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#nomeLugar')
const messageTwo = document.querySelector('#forecast')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Carregando...'
    messageTwo.textContent = ''

    fetch('/weather?local=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ('')
            } else {
                messageOne.textContent = data.local
                messageTwo.textContent = data.forecast
                console.log(location)
            }
        })
    })
})