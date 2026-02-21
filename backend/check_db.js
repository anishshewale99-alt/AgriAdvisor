const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

async function check() {
    await mongoose.connect(process.env.MONGO_URI);
    const count = await User.countDocuments();
    console.log('User count:', count);
    const users = await User.find({}, 'email name');
    console.log('Users:', users);
    process.exit(0);
}

check();
