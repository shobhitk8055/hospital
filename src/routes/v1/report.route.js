const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { getPatients } = require('../../validations/patient.validation');
const patientController = require('../../controllers/patient.controller');

const router = express.Router();

router.get('/:status', auth(), validate(getPatients), patientController.getPatients);

module.exports = router;
