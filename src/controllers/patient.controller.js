const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createPatient = catchAsync(async (req, res) => {
  const user = await userService.createPatient(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const createReport = catchAsync(async (req, res) => {
  const patientId = req.params.id;
  req.body.doctor = req.user._id;
  const report = await userService.createReport(patientId, req.body);
  res.status(httpStatus.CREATED).send(report);
});

const getReports = catchAsync(async (req, res) => {
  const patientId = req.params.id;
  const result = await userService.queryReports(patientId);
  res.send(result);
});

const getPatients = catchAsync(async (req, res) => {
  const status = req.params.status;
  const result = await userService.getPatientsFromStatus(status);
  res.send(result);
});

module.exports = {
  createPatient,
  createReport,
  getReports,
  getPatients
};
