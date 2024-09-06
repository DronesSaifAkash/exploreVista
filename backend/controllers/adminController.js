// controllers/adminController.js
const Destination = require('../models/Destination');
const District = require('../models/District'); // Import District model
const path = require('path');
const fs = require('fs');
const Contact = require('../models/contact');

class adminController {

    async addDestination(req, res) {
        try {
            const { name, description, location, rating } = req.body;

            const existingDestination = await Destination.findOne({ name: name });
            if (existingDestination) {
                return res.status(400).json({ message: 'Destination with this name already exists.' });
            }

            if (!req.file) {
                return res.status(400).json({ message: 'Image file is required.' });
            }

            const formattedName = name.toLowerCase().replace(/ /g, '-');
            const thumbnail = `${formattedName}-thumbnail${path.extname(req.file.originalname)}`;
            const image = `${formattedName}${path.extname(req.file.originalname)}`;
            const detailsPageLink = `/destinations/${formattedName}`;

            const newDestination = new Destination({
                name,
                thumbnail,
                description,
                location,
                rating,
                detailsPageLink,
                image
            });
            await newDestination.save();
            res.status(201).json({ message: 'Destination added successfully!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async updateDestination(req, res) {
        try {
            const destinationId = req.params.id;
            const existingDestination = await Destination.findById(destinationId);
            if (!existingDestination) return res.status(404).json({ message: 'Destination not found' });
            const updateData = {
                name: req.body.name,
                description: req.body.description,
                location: req.body.location,
                rating: req.body.rating,
            };

            if (req.file) {
                const oldImage = existingDestination.image;
                if (oldImage) {
                    const oldImagePath = path.join(__dirname, '../public/images/destinations/', oldImage);
                    fs.unlink(oldImagePath, (err) => {
                        if (err) console.error('Error deleting old image:', err);
                    });
                }
                updateData.image = req.file.filename;
            }

            const updatedDestination = await Destination.findByIdAndUpdate(destinationId, updateData, { new: true });
            if (!updatedDestination) return res.status(404).json({ message: 'Destination not found' });

            res.json(updatedDestination);
        } catch (error) {
            res.status(500).json({ message: 'Error updating destination', error });
        }
    }

    async deleteDestination(req, res) {
        try {
            const destinationId = req.params.id;
            const destination = await Destination.findById(destinationId);
            if (!destination) return res.status(404).json({ message: 'Destination not found' });

            if (destination.image) {
                const imagePath = path.join(__dirname, '../public/images/destinations/', destination.image);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            // // Delete the thumbnail file (if exists)
            // if (destination.thumbnail) {
            //     const thumbnailPath = path.join(__dirname, '../public/images/destinations/', destination.thumbnail);
            //     if (fs.existsSync(thumbnailPath)) {
            //         fs.unlinkSync(thumbnailPath);
            //     }
            // }

            await Destination.findByIdAndDelete(destinationId);
            res.status(200).json({ message: 'Destination deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting destination', error });
        }
    }

    async getAllContacts(req, res) {
        try {
            const contacts = await Contact.find().sort({ createdAt: -1 }); // Sort by most recent
            res.status(200).json(contacts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error', error });
        }
    }

    // async addDistrict(req, res) {
    //     const { name, description } = req.body;
    //     const image = req.file ? req.file.filename : null;

    //     try {
    //         const newDistrict = new District({
    //             name,
    //             description,
    //             image,
    //         });
    //         await newDistrict.save();
    //         res.status(201).json({ message: 'District added successfully', district: newDistrict });
    //     } catch (error) {
    //         res.status(500).json({ message: 'Failed to add district', error });
    //     }
    // }
}

module.exports = new adminController();
