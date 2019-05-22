'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _express = require('express');

var _inventory = require('../model/inventory');

exports.default = function () {
    var personApi = (0, _express.Router)();
    personApi.get('/api/person/:page_no/:page_size/:filter/:id_company', function (req, resp) {

        var per_page = parseInt(req.params.page_size) || 10;
        var page_no = parseInt(req.params.page_no) || 0;
        var filter = req.params.filter;
        var id_company = req.params.id_company;

        var filterCondition = filter !== '-' ? {
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
                    }, {
                        dni: {
                            $regex: filter,
                            $options: 'i'
                        }
                    }]
                }
            }
        } : { _id: id_company };

        var pipe = filter !== '-' ? [{
            $match: {
                _id: new _mongoose.ObjectId(id_company)
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
                }, {
                    'persons.surname': {
                        $regex: filter,
                        $options: 'i'
                    }
                }, {
                    'persons.dni': {
                        $regex: filter,
                        $options: 'i'
                    }
                }]
            }
        }, {
            $skip: per_page * page_no
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
                _id: new _mongoose.ObjectId(id_company)
            }
        }, {
            $unwind: '$persons'
        }, {
            $skip: per_page * page_no
        }, {
            $limit: per_page
        }, {
            $group: {
                _id: '$_id',
                persons: {
                    $push: '$persons'
                }
            }
        }];

        _inventory.CompanyModel.findOne(filterCondition).then(function (company) {
            _inventory.CompanyModel.aggregate(pipe).exec().then(function (companyResult) {
                var page = {
                    totalElements: company && company.persons ? company.persons.length : 0,
                    totalPages: Math.ceil(company.persons.length / per_page),
                    pageNumber: page_no,
                    data: companyResult && companyResult.length > 0 ? companyResult[0].persons : new Array()
                };
                resp.json(page);
            }).catch(function (err) {
                console.debug('Error ' + err);
                resp.status(500).json(err);
            });
        }).catch(function (err) {
            console.debug('Error ' + err);
            resp.status(500).json(err);
        });
    });

    personApi.post('/api/person/', function (req, resp) {
        if (!req.body) {
            return res.status(400).send('Request body is missing');
        }
        _inventory.CompanyModel.findOneAndUpdate({ _id: req.body.id_company }, { $push: { persons: req.body.person } }).then(function (company) {
            if (!company || company.length === 0) {
                return resp.status(500).send(company);
            }
            resp.status(201).send(company);
        }).catch(function (err) {
            console.log('Error ' + err);
            resp.status(500).json(err);
        });
    });

    personApi.put('/api/person/', function (req, resp) {
        if (!req.body) {
            return res.status(400).send('Request body is missing');
        }

        _inventory.CompanyModel.findOneAndUpdate({ _id: req.body.id_company, 'persons._id': req.body.person._id }, {
            $set: {
                "persons.$": req.body.person
            }
        }).then(function (company) {
            resp.json(company);
        }).catch(function (err) {
            console.log('Error ' + err);
            resp.status(500).json(err);
        });
    });

    personApi.delete('/api/person/:id/:id_company', function (req, resp) {
        if (!req.params.id && !req.params.id_company) {
            return res.status(400).send('Missing URL parameter: id');
        }
        _inventory.CompanyModel.updateOne({
            _id: req.params.id_company
        }, {
            $pull: {
                persons: {
                    _id: req.params.id
                }
            }
        }).then(function (result) {
            resp.json(result.ok === 1);
        }).catch(function (err) {
            console.log('Error ' + err);
            resp.status(500).json(err);
        });
    });

    return personApi;
};