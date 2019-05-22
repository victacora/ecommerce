import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import authRoute from './routes/auth';
import companyRoute from './routes/company';
import personRoute from './routes/person';

let app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());
app.use(authRoute)
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