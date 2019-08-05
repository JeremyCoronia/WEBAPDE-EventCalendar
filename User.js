const mongoose = require("mongoose")

var User = mongoose.model("user", {
    username: String, 
    password: String,
    email: String,
    validated: {
        type: Boolean,
        default: true
    }
})

module.exports = {
    User
}