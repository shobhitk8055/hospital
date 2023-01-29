const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const { reportStatus } = require('../config/constants');

const reportSchema = mongoose.Schema(
  {
    doctor: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    patient: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: reportStatus,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
reportSchema.plugin(toJSON);

/**
 * @typedef User
 */
const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
