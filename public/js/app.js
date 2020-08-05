console.log('Client side javascript file is loaded')

// fetch('http://127.0.0.1:3000/weather?address=boston').then((response) =>{
//     response.json().then((data) => {
//         if(data.error)
//         {
//             console.log(data.error)
//         }
//         else
//         {
//             console.log(data)
//         }
//     })
// })

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.querySelector('#message-2')

weatherform.addEventListener('submit', (e) =>{
    //prevent the browser to refresh the page
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ""
    fetch('http://127.0.0.1:3000/weather?address=' + location).then((response) =>{
    response.json().then((data) => {
        if(data.error)
        {
            messageOne.textContent = data.error
        }
        else
        {
            messageOne.textContent = 'Forecast - ' + data.forecast
            messageTwo.textContent = 'Temperature - ' + data.temperature
        }
    })
})
})