let express = require('express')
let router = express.Router()
let inventoryModel = require('../model/inventory.model')

router.get('/api/company/:page_no/:page_size/:filter', (req, resp) => {

    const per_page = parseInt(req.params.page_size) || 10
    const page_no = parseInt(req.params.page_no) || 0
    const filter = req.params.filter;

    const filterCondition = filter !== '-' ? {
        $or: [{
                name: {
                    $regex: filter,
                    $options: 'i'
                }
            },
            {
                nit: {
                    $regex: filter,
                    $options: 'i'
                }
            }
        ]
    } : {};


    inventoryModel.CompanyModel.countDocuments(filterCondition).then(
        totalResult => {
            inventoryModel.CompanyModel.find(filterCondition).limit(per_page).skip((per_page * page_no)).exec()
                .then(companies => {
                    const page = {
                        totalElements: totalResult,
                        totalPages: Math.ceil(totalResult / per_page),
                        pageNumber: page_no,
                        data: companies
                    };
                    resp.json(page)
                })
                .catch(err => {
                    console.debug('Error ' + err)
                    resp.status(500).json(err)
                })
        }).catch(err => {
        console.debug('Error ' + err)
        resp.status(500).json(err)
    })



})

router.post('/api/company/', (req, resp) => {
    if (!req.body) {
        return res.status(400).send('Request body is missing')
    }

    inventoryModel.CompanyModel.create(req.body)
        .then(company => {
            if (!company || company.length === 0) {
                return resp.status(500).send(company)
            }
            resp.status(201).send(company)
        })
        .catch(err => {
            console.log('Error ' + err);
            resp.status(500).json(err)
        })
})

router.put('/api/company/', (req, resp) => {
    if (!req.body) {
        return res.status(400).send('Request body is missing')
    }

    inventoryModel.CompanyModel.updateOne({
            _id: req.body._id
        }, req.body)
        .then(company => {
            resp.json(company)
        })
        .catch(err => {
            console.log('Error ' + err);
            resp.status(500).json(err)
        })
})


router.delete('/api/company/:id', (req, resp) => {
    if (!req.params.id) {
        return res.status(400).send('Missing URL parameter: id')
    }
    inventoryModel.CompanyModel.deleteOne({
            _id: req.params.id
        })
        .then(result => {
            resp.json(result.ok === 1)
        })
        .catch(err => {
            console.log('Error ' + err);
            resp.status(500).json(err)
        })
})


module.exports = router