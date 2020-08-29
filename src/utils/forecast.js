const request = require ('request')
const geocode = require ('./geocode')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=422cb6982ae8a1499b1ba22e57b16057&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m'

    request ({ url, json:true }, (error, {body} = {}) => {
        if (error){
            callback('Não conseguimos conectar ao serviço de clima.', undefined)
        } else if(body.error) {
            callback('Insira um local válido.', undefined)
        } else {
            callback(undefined, 'A temperatura é de ' + body.current.temperature + '°C. Verificado em ' + body.current.observation_time)
        }
    })
}

module.exports = forecast