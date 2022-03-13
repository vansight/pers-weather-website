const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const imgLoading = document.querySelector('#loading')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    imgLoading.style.display = "block"
    messageOne.textContent = ''
    messageTwo.textContent = ''
    const address = search.value
    
    fetch('/weather?address='+address).then((response) => {
        response.json().then((data) => {
        imgLoading.style.display = "none"
            if (data.error){
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }     
        })
    })
})