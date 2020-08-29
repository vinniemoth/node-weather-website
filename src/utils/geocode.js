const request = require ('request')
const forecast = require ('./forecast')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidmlubmllbW90aCIsImEiOiJja2U5bnN2dnUwNXZtMzBzOTF5ZTdmbWE5In0.VX79uzw5MlD6Yuhk-ZM3fw&limit=1&language=pt'

    request ({ url, json:true }, (error, {body} = {}) => {
        if (error){
            callback('Não conseguimos conectar ao serviço de localização.', undefined)
        } else if (body.features.length === 0) {
            callback('Local pesquisado não foi encontrado', undefined)
        } else {
            callback(undefined, {
                local: body.features[0].place_name_pt,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
}

module.exports = geocode