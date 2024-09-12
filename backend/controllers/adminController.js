// controllers/adminController.js
const Destination = require('../models/Destination');
const District = require('../models/District'); // Import District model
const path = require('path');
const fs = require('fs');
const Contact = require('../models/contact');
const TourPackage = require('../models/tourPackageSchema');
const CMS = require('../models/cms');
const Booking = require('../models/Booking.js');
const User = require('../models/user.js')

class adminController {

    async getAllDestinations(req, res) {
        try {
            const destinations = await Destination.find();
            res.json(destinations);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching destinations', error });
        }
    }

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

    async getDestinationById(req, res) {
        try {
            const destination = await Destination.findById(req.params.id);
            if (!destination) return res.status(404).json({ message: 'Destination not found' });
            res.json(destination);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching destination', error });
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

    async getContactById(req, res) {
        try {
            const { id } = req.params;
            const contact = await Contact.findById(id);
            if (!contact) {
                return res.status(404).json({ message: 'Contact not found' });
            }
            res.status(200).json(contact);
        } catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    }

    async replyToContact(req, res) {
        const { id } = req.params;
        const { content } = req.body;

        try {
            const contact = await Contact.findById(id);
            if (!contact) {
                return res.status(404).json({ message: 'Contact not found' });
            }

            // Add reply to the contact
            const reply = {
                content,
                replyBy: req.userId, // This will be the admin replying
                repliedAt: new Date(),
            };
            contact.replies.push(reply);

            await contact.save();

            return res.status(200).json({ message: 'Reply sent successfully', contact });
        } catch (err) {
            return res.status(500).json({ message: 'Error replying to contact', err });
        }
    };



    async getTourPackages(req, res) {
        try {
            const tourPackages = await TourPackage.find();
            res.status(200).json(tourPackages);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching tour packages', err });
        }
    }


    async createTourPackage(req, res) {
        try {
            const { name, description, price, duration, available } = req.body;
            const newTourPackage = new TourPackage({ name, description, price, duration, available });
            await newTourPackage.save();
            res.status(201).json({ message: 'Tour package created successfully', newTourPackage });
        } catch (err) {
            res.status(500).json({ message: 'Error creating tour package', err });
        }
    }


    async getTourPackageById(req, res) {
        try {
            const { id } = req.params;
            const tourPackage = await TourPackage.findById(id);
            if (!tourPackage) {
                return res.status(404).json({ message: 'Tour package not found' });
            }
            res.status(200).json(tourPackage);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching tour package', err });
        }
    }

    async updateAvailabilityOfTourPackageById(req, res) {
        try {
            const tourPackage = await TourPackage.findById(req.params.id);
            if (!tourPackage) {
                return res.status(404).json({ message: 'Tour package not found' });
            }
            tourPackage.available = !tourPackage.available;
            await tourPackage.save();

            res.json(tourPackage);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    }

    async updateTourPackage(req, res) {
        try {
            const { id } = req.params;
            const { name, description, price, duration, image, available } = req.body;
            const updatedTourPackage = await TourPackage.findByIdAndUpdate(id, { name, description, price, duration, image, available }, { new: true });
            if (!updatedTourPackage) {
                return res.status(404).json({ message: 'Tour package not found' });
            }
            res.status(200).json({ message: 'Tour package updated successfully', updatedTourPackage });
        } catch (err) {
            res.status(500).json({ message: 'Error updating tour package', err });
        }
    }

    async deleteTourPackage(req, res) {
        try {
            const { id } = req.params;
            const deletedTourPackage = await TourPackage.findByIdAndDelete(id);
            if (!deletedTourPackage) {
                return res.status(404).json({ message: 'Tour package not found' });
            }
            res.status(200).json({ message: 'Tour package deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Error deleting tour package', err });
        }
    }

    async getAboutUs(req, res) {
        try {
            const cmsContent = await CMS.findOne({ page: 'about-us' });
            if (!cmsContent) return res.status(404).json({ message: 'Content not found' });
            res.json(cmsContent);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateAboutUs(req, res) {
        try {
            const { title, content } = req.body;
            if (!title || !content) {
                return res.status(400).json({ message: 'Title and content are required' });
            }

            const updatedAboutUs = await CMS.findOneAndUpdate(
                { page: 'about-us' },
                { title, content, createdAt: new Date() },
                { new: true, upsert: true } // Return the updated document and create one if it doesn't exist
            );

            if (updatedAboutUs) {
                res.json({ message: 'About Us page updated successfully', data: updatedAboutUs });
            } else {
                res.status(404).json({ message: 'About Us page not found' });
            }
        } catch (error) {
            console.error('Error updating About Us page:', error);
            res.status(500).json({ message: 'An error occurred while updating the About Us page' });
        }
    }

    async getBookingsList(req, res) {
        try {
            // Fetch all bookings
            const bookings = await Booking.find({})
                .populate({
                    path: 'userId',
                    select: 'name' // Adjust fields as needed
                })
                .populate({
                    path: 'tourPackageId',
                    select: 'name' // Adjust fields as needed
                });
            return res.status(200).json(bookings);

        } catch (err) {
            console.error('Error fetching bookings list:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getBookingDetailsById(req, res) {
        try {
            // Fetch the booking by ID
            const booking = await Booking.findById(req.params.id)
                .populate('tourPackageId', 'name price')
                .populate({
                    path: 'userId',
                    select: 'name' // Adjust fields as needed
                }); // Adjust the fields you need from the tour package
            if (!booking) {
                return res.status(404).json({ message: 'Booking not found' });
            }
            res.json(booking);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    async updateBookingStatus(req, res) {
        const { id } = req.params; // Get booking ID from params
        const { status } = req.body; // Get new status from the request body

        try {
            // Find the booking by ID
            const booking = await Booking.findById(id);

            if (!booking) {
                return res.status(404).json({ message: 'Booking not found' });
            }

            // Update the status of the booking
            booking.status = status;
            await booking.save();

            res.status(200).json({ message: 'Booking status updated successfully', booking });
        } catch (error) {
            console.error('Error updating booking status:', error);
            res.status(500).json({ message: 'Server error' });
        }

    }

    async stats(req, res) {
        try {
            const totalBookings = await Booking.countDocuments();
            const totalDestinations = await Destination.countDocuments();
            const totalUsers = await User.countDocuments({ type: { $ne: 'admin' } });
            const totalTourPackages = await TourPackage.countDocuments();

            res.json({
                totalBookings,
                totalDestinations,
                totalUsers,
                totalTourPackages,
            });
        } catch (error) {
            res.status(500).json({ error: 'Error fetching stats' });
        }

    }
}

module.exports = new adminController();
