const Contact = require('../models/contact'); // Adjust the path as needed
const Tour = require('../models/tourPackageSchema');
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

    async getAlltourDetails(req, res){
        try{
            const Tours = await Tour.find();
            res.status(200).json(Tours)
        }catch(err){
            res.status(500).json({ message: 'Error fetching tour packages', err:err });
        }

    }
}

module.exports = new frontendController();