const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=88c3a186e1a10d9ea4e0e4293c3c4f9a&query='+latitude+ ',' + longitude+'&units=m'
    request({url:url, json:true}, (error, response) => {
        if (error)
        {
            callback('Unable to connect to internet', undefined)
        }
        else if(response.body.error)
        {
            callback('Location Error' , undefined)
        }
        else{
            callback(undefined, {
                temperature: response.body.current.temperature,
                weather: response.body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast