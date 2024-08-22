const mongoose = require('mongoose');

const maintenanceSchema = mongoose.Schema({
    carDetails: {
        number: { type: String, required: true },
        color: { type: String, required: true },
        model: { type: String, required: true },
    },
    workDescription: { type: String, required: true },
    paymentStatus: {
        received: { type: Boolean, default: false },
        paymentMethod: { type: String, enum: ['Cash', 'Card'], required: true },
    },
}, {
    timestamps: true,
});

const Maintenance = mongoose.model('Maintenance', maintenanceSchema);

module.exports = Maintenance;