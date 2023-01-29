const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { createPatient, createReport, getReports } = require('../../validations/patient.validation');
const patientController = require('../../controllers/patient.controller');

const router = express.Router();

router.post('/register', auth(), validate(createPatient), patientController.createPatient);
router.post('/:id/create_report', auth(), validate(createReport), patientController.createReport);
router.get('/:id/all_reports', auth(), validate(getReports), patientController.getReports);

module.exports = router;
