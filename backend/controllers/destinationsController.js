// controllers/destinationsController.js
const Destination = require('../models/Destination');

class DestinationController {
    
   

    async getDestinationById(req, res) {
        try {
            const destination = await Destination.findById(req.params.id);
            if (!destination) return res.status(404).json({ message: 'Destination not found' });
            res.json(destination);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching destination', error });
        }
    }

    async createDestination(req, res) {
        try {
            const newDestination = new Destination(req.body);
            await newDestination.save();
            res.status(201).json(newDestination);
        } catch (error) {
            res.status(500).json({ message: 'Error creating destination', error });
        }
    }

    async updateDestination(req, res) {
        try {
            const updatedDestination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedDestination) return res.status(404).json({ message: 'Destination not found' });
            res.json(updatedDestination);
        } catch (error) {
            res.status(500).json({ message: 'Error updating destination', error });
        }
    }

    async deleteDestination(req, res) {
        try {
            const deletedDestination = await Destination.findByIdAndDelete(req.params.id);
            if (!deletedDestination) return res.status(404).json({ message: 'Destination not found' });
            res.json({ message: 'Destination deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting destination', error });
        }
    }
}

module.exports = new DestinationController();
