const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: String,
    profilePic: {
        type: String,
        default: "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"

    },
    menu: String,
    price: Number,
    hotel:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels"
    },
    
});


const User = mongoose.model("User", userSchema);

module.exports = { User };