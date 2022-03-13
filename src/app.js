const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

//Define the paths for Express config using path
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// initialize the engine for dynamic pages using handlebars and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set the directory on where express will make reference to serve
app.use(express.static(publicDirectory))

// app.get will serve the content to the specified page, in this case home, but it could bw '/about' ... or others.
// in this case we are using render to specify the page and the arguments that will be used by the page  p.e {{title}}
app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Rodrigo Luevano'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Rodrigo Luevano'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Rodrigo Luevano',
        message: 'This is a help message'
    })
})

//res.send will send to the page any content, like objects, html or json.
app.get('/weather', (req, res) => {

   if (!req.query.address) {
       return res.send ({
           error: "Address needs to be provided"
       })
   }

    geocode(req.query.address , (error, { latitud, longitud, location } = {}) => {
        if (error) {
          return res.send({ error })
        }

        forecast(latitud, longitud, (error, forecastData) => {
            if (error) {
               return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })   
})

app.get('/products', (req, res) =>{
    res.send({
        products : []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Rodrigo Luevano',
        message: 'Help article not found'
    })
})

app.get('*' , (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Rodrigo Luevano',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Service is up on port' + port)
})