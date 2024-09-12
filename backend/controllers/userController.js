const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Contact = require('../models/contact');
const Booking = require('../models/Booking');
const Destination = require('../models/Destination');
const TourPackage = require('../models/tourPackageSchema');

class UserController {
    // Register User
    async registerUser(req, res) {
        const { name, email, password } = req.body;
        try {
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = await User.create({
                name,
                email,
                password: hashedPassword,
            });
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '30d',
            });
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token,
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    // Login User
    async loginUser(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            }); //  m for minutes, h for hours, d for days, etc. 300 means 300 secs, 
            // console.log(user);
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                type: user.type,
                token,
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    async getUserContacts(req, res) {
        try {
            // Fetch the logged-in user's email from the request object
            const user = await User.findById(req.userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const contacts = await Contact.find({ email: user.email }).sort({ createdAt: -1 }); // Sort by most recent
            res.status(200).json(contacts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async getContactById(req, res) {
        const { id } = req.params;
        try {
            const contact = await Contact.findOne({ _id: id }); // Ensure the contact belongs to the logged-in user
            if (!contact) {
                return res.status(404).json({ message: 'Contact not found' });
            }
            res.status(200).json(contact);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error', error });
        }
    };

    // Reply to a contact
    async replyToContact(req, res) {
        const { id } = req.params;
        const { content } = req.body;
        try {
            const contact = await Contact.findOne({ _id: id });
            if (!contact) {
                return res.status(404).json({ message: 'Contact not found' });
            }
            contact.replies.push({
                content,
                repliedAt: new Date(),
            });
            await contact.save();
            res.status(200).json({ message: 'Reply sent successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async createBooking(req, res) {
        try {
            const { userId, tourPackageId, visitDate, endDate, numberOfMembers, discountApplied } = req.body;
    
            // Validate required fields
            if (!userId || !tourPackageId || !visitDate || !numberOfMembers) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
    
            // Validate userId
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            const tourPackage = await TourPackage.findById(tourPackageId);
            if (!tourPackage) {
                return res.status(404).json({ message: 'Tour package not found' });
            }
    
            let totalPrice = tourPackage.price * numberOfMembers;
            if (discountApplied) {
                totalPrice = totalPrice * (1 - (parseFloat(discountApplied) / 100));
            }
    
            const booking = new Booking({
                userId,
                tourPackageId,
                visitDate,
                endDate,
                numberOfMembers,
                totalPrice,
                discountApplied
            });
    
            await booking.save();
    
            res.status(201).json({ message: 'Booking successful', booking });
        } catch (error) {
            res.status(500).json({ message: 'Error creating booking', error });
        }
    }

    async getProfileInfo(req, res) {
        try {
            const user = await User.findById(req.userId);
            
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async getTourPackageById(req, res) {
        const { id } = req.params;
        const tourPackage = await TourPackage.findById(req.params.id);
        if (!tourPackage) {
            res.status(404);
            throw new Error('Tour package not found');
        }
        res.json(tourPackage);
    }

    async getUserBookings(req, res) {
        try {
            const userId = req.params.userId; 
            if (!userId) {
                return res.status(400).json({ message: 'User ID is required' });
            }
    
            const bookings = await Booking.find({ userId }).populate('tourPackageId', 'name'); // Populate tourPackageId with name
            res.status(200).json(bookings);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            res.status(500).json({ message: 'Error fetching bookings', error });
        }
    }

    async getBookingsDetails(req, res){
        try {
            const { id } = req.params; // Get the booking ID from the URL parameters
    
            // Validate the ID
            if (!id) {
                return res.status(400).json({ message: 'Booking ID is required' });
            }
    
            // Fetch booking details from the database
            const booking = await Booking.findById(id).populate('tourPackageId'); // Assuming `tourPackageId` is a reference field
    
            // If no booking found, return a 404 error
            if (!booking) {
                return res.status(404).json({ message: 'Booking not found' });
            }
    
            // Send the booking details in the response
            res.status(200).json(booking);
        } catch (err) {
            // Handle any errors
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    }

    async stats(req, res) {
        try {
            const userId = req.params.id;
            const totalBookings = await Booking.countDocuments({ userId: userId });
    
            res.json({ totalBookings });
        } catch (error) {
            console.error('Error fetching stats:', error);
            res.status(500).json({ error: 'Error fetching stats' });
        }
    }
    
    
}

module.exports = new UserController();