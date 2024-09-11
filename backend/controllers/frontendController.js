const Contact = require('../models/contact'); // Adjust the path as needed
const Tour = require('../models/tourPackageSchema');
const District = require('../models/District');
const CMS = require('../models/cms');

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
}

module.exports = new frontendController();