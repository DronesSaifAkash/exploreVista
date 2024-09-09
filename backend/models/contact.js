const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String, required: true, trim: true
    },
    email: {
        type: String, required: true, trim: true, lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address.']
    },
    subject: {
        type: String, required: true, trim: true
    },
    message: {
        type: String, required: true
    },
    createdAt: {
        type: Date, default: Date.now
    },
    replies: [
        {
            content: String,
            replyBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            repliedAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
