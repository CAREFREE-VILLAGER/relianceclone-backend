
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                
                return /\S+@\S+\.\S+/.test(v);
            },
            message: props => `${props.value} is not a valid email address. Please enter a valid email address.`
        }
    },
    mobileNumber: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
