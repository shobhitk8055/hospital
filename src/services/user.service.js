const httpStatus = require('http-status');
const { User, Report } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a doctor
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createDoctor = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
};

/**
 * Create a patient
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createPatient = async (userBody) => {
  userBody.role = 'patient';
  if (await User.isPhoneTaken(userBody.phone)) {
    return User.findOne({ phone: userBody.phone });
  }
  return User.create(userBody);
};

/**
 * Create a report
 * @param {ObjectId} patientId
 * @param {Object} reportBody
 * @returns {Promise<Report>}
 */
const createReport = async (patientId, reportBody) => {
  const findPatient = await User.findOne({ _id: patientId, role: 'patient' });
  if (!findPatient) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Patient not found with that id!');
  }
  reportBody.patient = patientId;
  return Report.create(reportBody);
};

/**
 * Query for reports
 * @param {ObjectId} patientId
 * @returns {Promise<QueryResult>}
 */
const queryReports = async (patientId) => {
  const findPatient = await User.findOne({ _id: patientId, role: 'patient' });
  if (!findPatient) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Patient not found with that id!');
  }
  return Report.find({ patient: patientId }).sort({ date: 1 });
};

/**
 * Query for patients
 * @param {String} status - Status of report
 * @returns {Promise<User>}
 */
const getPatientsFromStatus = async (status) => {
  const reports = await Report.find({ status });
  const patientIds = reports.map((i) => i.patient);
  return User.find({ _id: { $in: patientIds } });
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

module.exports = {
  createDoctor,
  createPatient,
  createReport,
  queryReports,
  getPatientsFromStatus,
  getUserByEmail
};
