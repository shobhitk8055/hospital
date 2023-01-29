const Joi = require('joi');
const { reportStatus } = require('../config/constants');
const { objectId } = require('./custom.validation');

const createPatient = {
  body: Joi.object().keys({
    phone: Joi.string().required(),
    name: Joi.string().required(),
    age: Joi.number().required(),
    gender: Joi.string().required().valid('male', 'female'),
  }),
};

const createReport = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    status: Joi.string()
      .required()
      .valid(...reportStatus),
    date: Joi.date().required(),
  }),
};

const getReports = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const getPatients = {
  params: Joi.object().keys({
    status: Joi.string().valid(...reportStatus),
  }),
};

module.exports = {
  createPatient,
  createReport,
  getReports,
  getPatients,
};
