const Contact = require('../models/contact'); // Adjust the path as needed

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
}

module.exports = new frontendController();