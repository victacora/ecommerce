let express = require('express')
let router = express.Router()
let CompanyModel = require('../model/company.model')

router.get('/api/company/', (req, resp) => {
    CompanyModel.find()
        .then(companies => {
            resp.json(companies)
        })
        .catch(err => {
            resp.status(500).json(err)
        })
})


router.post('/api/company/', (req, resp) => {
    if (!req.body) {
        return res.status(400).send('Request body is missing')
    }

    CompanyModel.create(req.body)
        .then(company => {
            if (!company || company.length === 0) {
                return resp.status(500).send(company)
            }
            resp.status(201).send(company)
        })
        .catch(err => {
            resp.status(500).json(err)
        })
})

router.put('/api/company/', (req, resp) => {
    if (!req.body) {
        return res.status(400).send('Request body is missing')
    }

    CompanyModel.update({
            nit: req.body.nit
        }, req.body)
        .then(company => {
            res.json(company)
        })
        .catch(err => {
            resp.status(500).json(err)
        })
})


router.delete('/api/company/:nit', (req, resp) => {
    if (!req.params.nit) {
        return res.status(400).send('Missing URL parameter: nit')
    }

    CustomerModel.findOneAndRemove({
            nit: req.params.nit
        })
        .then(company => {
            res.json(company)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


module.exports = router