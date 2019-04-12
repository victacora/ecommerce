let mongoose = require('mongoose')
let ObjectId = mongoose.Types.ObjectId;
let express = require('express')
let router = express.Router()
let inventoryModel = require('../model/inventory.model')

router.get('/api/person/:page_no/:page_size/:filter/:id_company', (req, resp) => {

    const per_page = parseInt(req.params.page_size) || 10
    const page_no = parseInt(req.params.page_no) || 0
    const filter = req.params.filter;
    const id_company = req.params.id_company

    const filterCondition = filter !== '-' ?
        {
            _id: id_company,
            persons: {
                $elemMatch: {
                    $or: [{
                        name: {
                            $regex: filter,
                            $options: 'i'
                        }
                    }, {
                        surname: {
                            $regex: filter,
                            $options: 'i'
                        }
                    },
                    {
                        dni: {
                            $regex: filter,
                            $options: 'i'
                        }
                    }
                    ]
                }
            }
        } : { _id: id_company };

    const pipe = filter !== '-' ? [{
        $match: {
            _id: new ObjectId(id_company)
        }
    }, {
        $unwind: '$persons'
    }, {
        $match: {
            $or: [{
                'persons.name': {
                    $regex: filter,
                    $options: 'i'
                }
            },
            {
                'persons.surname': {
                    $regex: filter,
                    $options: 'i'
                }
            },
            {
                'persons.dni': {
                    $regex: filter,
                    $options: 'i'
                }
            }
            ]
        }
    }, {
        $skip: (per_page * page_no)
    }, {
        $limit: per_page
    }, {
        $group: {
            _id: '$_id',
            persons: {
                $push: '$persons'
            }
        }
    }] : [{
        $match: {
            _id: new ObjectId(id_company)
        }
    }, {
        $unwind: '$persons'
    }, {
        $skip: (per_page * page_no)
    }, {
        $limit: per_page
    }, {
        $group: {
            _id: '$_id',
            persons: {
                $push: '$persons'
            }
        }
    }]

    inventoryModel.CompanyModel.findOne(filterCondition).then(
        company => {
            inventoryModel.CompanyModel.aggregate(pipe).exec()
                .then(companyResult => {
                    const page = {
                        totalElements: company && company.persons ? company.persons.length : 0,
                        totalPages: Math.ceil(company.persons.length / per_page),
                        pageNumber: page_no,
                        data: companyResult && companyResult.length > 0 ? companyResult[0].persons : new Array()
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

router.post('/api/person/', (req, resp) => {
    if (!req.body) {
        return res.status(400).send('Request body is missing')
    }
    console.log(req.body.person)

    inventoryModel.CompanyModel.findOneAndUpdate({ _id: req.body.id_company }, { $push: { persons: req.body.person } })
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

router.put('/api/person/', (req, resp) => {
    if (!req.body) {
        return res.status(400).send('Request body is missing')
    }

    console.log(req.body)
    inventoryModel.CompanyModel.findOneAndUpdate(
        { _id: req.body.id_company, 'persons._id': req.body.person._id },
        { 
            $set: {
                "persons.$": req.body.person
            }
        })
        .then(company => {
            resp.json(company)
        })
        .catch(err => {
            console.log('Error ' + err);
            resp.status(500).json(err)
        })
})


router.delete('/api/person/:id/:id_company', (req, resp) => {
    if (!req.params.id && !req.params.id_company) {
        return res.status(400).send('Missing URL parameter: id')
    }
    inventoryModel.CompanyModel.updateOne({
        _id: req.params.id_company
    },
        {
            $pull: {
                persons: {
                    _id: req.params.id
                }
            }
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