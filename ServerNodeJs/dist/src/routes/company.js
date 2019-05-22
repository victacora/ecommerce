'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _inventory = require('../model/inventory');

exports.default = function () {
    var companyApi = (0, _express.Router)();
    companyApi.get('/api/company/:page_no/:page_size/:filter', function (req, resp) {

        var per_page = parseInt(req.params.page_size) || 10;
        var page_no = parseInt(req.params.page_no) || 0;
        var filter = req.params.filter;

        var filterCondition = filter !== '-' ? {
            $or: [{
                name: {
                    $regex: filter,
                    $options: 'i'
                }
            }, {
                nit: {
                    $regex: filter,
                    $options: 'i'
                }
            }]
        } : {};

        _inventory.CompanyModel.countDocuments(filterCondition).then(function (totalResult) {
            _inventory.CompanyModel.find(filterCondition).limit(per_page).skip(per_page * page_no).exec().then(function (companies) {
                var page = {
                    totalElements: totalResult,
                    totalPages: Math.ceil(totalResult / per_page),
                    pageNumber: page_no,
                    data: companies
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

    companyApi.post('/api/company/', function (req, resp) {
        if (!req.body) {
            return res.status(400).send('Request body is missing');
        }

        _inventory.CompanyModel.create(req.body).then(function (company) {
            if (!company || company.length === 0) {
                return resp.status(500).send(company);
            }
            resp.status(201).send(company);
        }).catch(function (err) {
            console.log('Error ' + err);
            resp.status(500).json(err);
        });
    });

    companyApi.put('/api/company/', function (req, resp) {
        if (!req.body) {
            return res.status(400).send('Request body is missing');
        }

        _inventory.CompanyModel.updateOne({
            _id: req.body._id
        }, req.body).then(function (company) {
            resp.json(company);
        }).catch(function (err) {
            console.log('Error ' + err);
            resp.status(500).json(err);
        });
    });

    companyApi.delete('/api/company/:id', function (req, resp) {
        if (!req.params.id) {
            return res.status(400).send('Missing URL parameter: id');
        }
        _inventory.CompanyModel.deleteOne({
            _id: req.params.id
        }).then(function (result) {
            resp.json(result.ok === 1);
        }).catch(function (err) {
            console.log('Error ' + err);
            resp.status(500).json(err);
        });
    });
    return companyApi;
};