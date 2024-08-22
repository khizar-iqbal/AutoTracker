const express = require('express');
const { check, validationResult } = require('express-validator');
const {
    createMaintenanceRecord,
    getMaintenanceRecords,
    updateMaintenanceRecord,
    deleteMaintenanceRecord,
    getMaintenanceRecordById,
} = require('../controllers/maintenanceController');

const router = express.Router();

// Validation rules
const maintenanceValidationRules = [
    check('carDetails.number').notEmpty().withMessage('Car number is required'),
    check('carDetails.color').notEmpty().withMessage('Car color is required'),
    check('carDetails.model').notEmpty().withMessage('Car model is required'),
    check('workDescription').notEmpty().withMessage('Work description is required'),
];

// Create a maintenance record with validation
router.route('/').post(
    maintenanceValidationRules,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    createMaintenanceRecord
);

// Update a maintenance record with validation
router.route('/:id').put(
    maintenanceValidationRules,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    updateMaintenanceRecord
);

// Get and delete routes without validation
router.route('/').get(getMaintenanceRecords);
router.route('/:id').delete(deleteMaintenanceRecord);
router.route('/:id').get(getMaintenanceRecordById);

module.exports = router;
