let express = require('express')
let path = require('path')
let bodyParser = require('body-parser')

let app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

let companyRoute = require('./routes/company.route')

app.use(companyRoute)


app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
    next()
})

app.use(express.static('public'))

// Handler for 404 - Resource Not Found
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '../public/404.html'))
})

// Handler for Error 500
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.sendFile(path.join(__dirname, '../public/500.html'))
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`Server has started on ${PORT}`))