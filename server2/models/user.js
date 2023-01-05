const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        default: "https://res.cloudinary.com/dbhhztybd/image/upload/v1666636315/001_ffbyd5.jpg"
    },
    admin: {
        type: Boolean,
        default: false
    }
})

mongoose.model("User", userSchema)