const express = require('express');
const doctorRoute = require('./doctor.route');
const patientRoute = require('./patient.route');
const reportRoute = require('./report.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/doctor',
    route: doctorRoute,
  },
  {
    path: '/patient',
    route: patientRoute,
  },
  {
    path: '/report',
    route: reportRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
