const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// console.log(__dirname)

// console.log(path.join(__dirname, '../public'))
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Anshul'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Anshul'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is the help message.',
        name: 'Anshul'
    })
})



// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// No need
// })

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Anshul',
//         age: 27
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error:'You must provide the address'
        })
    }

    geocode(req.query.address, (error, data) =>{
        if(error)
        {
            return res.send({
                error: error
            })
        }
        forecast(data.latitude, data.longitude, (error, forecastdata) => {
            if(error)
            {
                return res.send({
                    error: error
                })
            }
            res.send({
                address: req.query.address,
                forecast: forecastdata.weather,
                temperature: forecastdata.temperature
            })
        })
    })


    
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    //or we can do this instead of return res
    // else{
    //     res.send({
    //         products: []
    //     })
    // }
    console.log(req.query.search)
    
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Help article not found.'
    })
})

app.get('*', (req, res) =>{
    // res.send('My 404 Page')
    res.render('error', {
        title: 'Page not found.',
        
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})