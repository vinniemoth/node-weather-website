const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Definindo caminhos para configurações do Express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialDir = path.join(__dirname, '../templates/partials')

// Setup dos handlebars e localização da pasta de .hbr
app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialDir, function (err) {

})

// Setup do diretório estático de arquivos
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title:'Climatiza',
        name: 'Vinnie Moth'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'Sobre Mim:',
        name: 'Vinnie Moth'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Ajuda',
        ajuda:'Mensagem genérica de ajuda.',
        name:'Vinnie Moth'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.local){
        return res.send({
            error:'Você deve inserir um local.'
        })
    } else {
        geocode (req.query.local, (error, {longitude, latitude, local} = {}) => {
            if (error) {
                return res.send({ error })
            }
            forecast(longitude, latitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }

                res.send({
                    local,
                    forecast: forecastData,
                    pesquisa: req.query.local
                })

            })
        })
    }
})

app.get('/products',(req,res) => {
    if (!req.query.search){
         return res.send({
            error:'Você deve inserir um termo de pesquisa.'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404help', {
        title:'404',
        name:'Vinnie Moth'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        name:'Vinnie Moth'
    })
})

app.listen(3000, () => {
    console.log('Servidor está na port 3000')
})