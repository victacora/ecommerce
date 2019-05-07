let express = require('express')
let path = require('path')
let bodyParser = require('body-parser')
let cors = require('cors');
let jwt = require('express-jwt');
let jwtAuthz = require('express-jwt-authz');
let jwksRsa = require('jwks-rsa');

let app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors()); 




let companyRoute = require('./routes/company.route')
let personRoute = require('./routes/person.route')

app.use(companyRoute)
app.use(personRoute)


app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use(express.static('public'))

// Handler for 404 - Resource Not Found
app.use((req, res, next) => {
    console.error(req.path)
    res.status(404).sendFile(path.join(__dirname, '../public/404.html'))
})

// Handler for Error 500
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(505).sendFile(path.join(__dirname, '../public/500.html'))
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`Server has started on ${PORT}`))