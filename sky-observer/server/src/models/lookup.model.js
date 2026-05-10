const mongoose = require('mongoose');

const LookupSchema = new mongoose.Schema(
  {
    kind: { type: String, enum: ['phase', 'day', 'season'], required: true },
    refLabel: { type: String, required: true },
    dateOrYear: { type: String, required: true },
    locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lookup', LookupSchema);