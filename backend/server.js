const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const frontendRoutes = require('./routes/frontendRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());    
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use('/api', frontendRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
