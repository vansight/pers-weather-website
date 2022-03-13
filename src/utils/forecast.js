 const request = require('postman-request')

const forecast = (latitud, longitud, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f40a55887f318a61575e93d8e6ac7577&query=' + latitud + ','+ longitud
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to forecast services.', undefined)
        } else if (body.error) {
            callback('Unable to find location, please try a different one.', undefined)
        } else {
            callback(undefined, "Weather is " + body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degreess out. Feels like ' + body.current.feelslike + ' degrees. There is '+ body.current.precip + "% of rain. There is " + body.current.humidity + "% of humidity."  )
        }
    })
}

module.exports = forecast