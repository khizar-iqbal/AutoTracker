const Maintenance = require('../models/Maintenance');

// Create a new maintenance record
const createMaintenanceRecord = async (req, res, next) => {
    try {
        const { carDetails, workDescription, paymentStatus} = req.body;
        const maintenance = new Maintenance({ carDetails, workDescription, paymentStatus, receipt });
        const createdMaintenance = await maintenance.save();
        res.status(201).json(createdMaintenance);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

// Get all maintenance records
const getMaintenanceRecords = async (req, res, next) => {
    try {
        const records = await Maintenance.find({});
        res.json(records);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

// Get a specific maintenance record by ID
const getMaintenanceRecordById = async (req, res, next) => {
    try {
        const record = await Maintenance.findById(req.params.id);
        if (record) {
            res.json(record);
        } else {
            res.status(404).json({ message: 'Record not found' });
        }
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

// Update a specific maintenance record by ID
const updateMaintenanceRecord = async (req, res, next) => {
    try {
        const record = await Maintenance.findById(req.params.id);

        if (record) {
            record.carDetails = req.body.carDetails || record.carDetails;
            record.workDescription = req.body.workDescription || record.workDescription;
            record.paymentStatus = req.body.paymentStatus || record.paymentStatus;
            record.receipt = req.body.receipt || record.receipt;

            const updatedRecord = await record.save();
            res.json(updatedRecord);
        } else {
            res.status(404).json({ message: 'Record not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating record' });
        next(error); // Pass the error to the error handling middleware
    }
};

// Delete a specific maintenance record by ID
const deleteMaintenanceRecord = async (req, res, next) => {
    try {
        const record = await Maintenance.findById(req.params.id);
        if (record) {
            await Maintenance.deleteOne({ _id: req.params.id });
            res.json({ message: 'Record removed' });
        } else {
            res.status(404).json({ message: 'Record not found' });
        }
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

module.exports = {
    createMaintenanceRecord,
    getMaintenanceRecords,
    getMaintenanceRecordById,
    updateMaintenanceRecord,
    deleteMaintenanceRecord,
};
