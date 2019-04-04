let express = require('express')
let router = express.Router()
let CompanyModel = require('../model/company.model')

router.get('/api/person/:page_no/:page_size/:filter/:id_company', (req, resp) => {

    const per_page = parseInt(req.params.page_size) || 10
    const page_no = parseInt(req.params.page_no) || 0
    const filter = req.params.filter;
    const id_company = req.params.id_company

    const filterCondition = filter !== '-' ? {
        $or: [{
                name: {
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
    } : { persons: { $elemMatch: {  } }, name: 1 };

    CompanyModel.findById(id_company)
        .populate({
            path: 'persons',
            select: filterCondition
        })
        .exec(
            function (err, company) {
                if (err) res.status(500).send(err);

                res.json(company.users);
            });

    CompanyModel.countDocuments(filterCondition).then(
        totalResult => {
            CompanyModel.find(filterCondition).limit(per_page).skip((per_page * page_no)).exec()
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

    CompanyModel.create(req.body.person)
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

    CompanyModel.updateOne({
            _id: req.body.person._id
        }, req.body)
        .then(company => {
            resp.json(company)
        })
        .catch(err => {
            console.log('Error ' + err);
            resp.status(500).json(err)
        })
})


router.delete('/api/company/:id/:id_company', (req, resp) => {
    if (!req.params.id && !req.params.id_company) {
        return res.status(400).send('Missing URL parameter: id')
    }
    CompanyModel.deleteOne({
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