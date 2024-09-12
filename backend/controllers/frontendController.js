const Contact = require('../models/contact'); // Adjust the path as needed
const Tour = require('../models/tourPackageSchema');
const District = require('../models/District');
const CMS = require('../models/cms');
const Destination = require('../models/Destination');

class frontendController {

    async submitContactForm(req, res) {
        try {
            const { name, email, subject, message } = req.body;

            const newContact = new Contact({
                name,
                email,
                subject,
                message
            });

            await newContact.save();
            res.status(201).json({ message: 'Message sent successfully!' });
        } catch (error) {
            console.error('Error saving contact message:', error);
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async getAlltourDetails(req, res) {
        try {
            const Tours = await Tour.find();
            res.status(200).json(Tours)
        } catch (err) {
            res.status(500).json({ message: 'Error fetching tour packages', err: err });
        }

    }

    async getAboutUsDetails(req, res) {
        try {

            const cmsContent = await CMS.findOne({ page: 'about-us' });
            if (!cmsContent) return res.status(404).json({ message: 'Content not found' });
            res.json(cmsContent);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async districtNameOnly(req, res) {
        try {
            const districts = await District.find({}).select('name');  // Only select 'name' field
            res.status(200).json(districts);
        } catch (err) {
            res.status(500).json({ error: 'Server Error' });
        }
    }

    async listDistricts(req, res) {
        try {
            const districts = await District.find({});
            res.status(200).json(districts);
        } catch (err) {
            res.status(500).json({ error: 'Server Error' });
        }
    }

    async getDistrictInfo(req, res) {
        try {
            const district = await District.findById(req.params.id);
            if (!district) {
                return res.status(404).json({ message: "District not found" });
            }
            res.json(district);
        } catch (error) {
            console.error("Error fetching district details:", error);
            res.status(500).json({ message: "Server error" });
        }
    }

    async getAllDestinations(req, res) {
        const { district, page = 1, limit = 10 } = req.query;

        try {
            const filter = district ? { location: district } : {};

            const destinations = await Destination.find(filter)
                .skip((page - 1) * limit)
                .limit(parseInt(limit))
                .exec();

            const totalDestinations = await Destination.countDocuments(filter);

            res.status(200).json({
                destinations,
                totalPages: Math.ceil(totalDestinations / limit),
                currentPage: parseInt(page),
            });
        } catch (error) {
            res.status(500).json({ error: 'Error fetching destinations' });
        }
    }

    async getDestinationInfo(req, res) {
        try {
            const destination = await Destination.findById(req.params.id);
            if (!destination) {
                return res.status(404).json({ message: "Destination not found" });
            }
            res.json(destination);
        } catch (error) {
            console.error("Error fetching destination:", error);
            res.status(500).json({ message: "Server error" });
        }
    }

}

module.exports = new frontendController();