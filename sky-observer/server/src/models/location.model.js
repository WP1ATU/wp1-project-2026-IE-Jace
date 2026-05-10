const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    tz: { type: Number, required: true },
    dstDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Location', LocationSchema);