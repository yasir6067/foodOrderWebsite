const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
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
        validate: {
            validator: function(v) {
                return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/.test(v);
            },
            message: props => `Password should be at least 6 characters long and include at least one letter, one number, and one special character.`
        }
    },
    profilepic: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
    },
    hotels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotels"
    }]
});

const User = mongoose.model('User', userschema);
module.exports = { User };
