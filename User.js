const mongoose = require("mongoose")

var User = mongoose.model("user", {
    username: String, 
    password: String,
    email: String,
    validated: {
        type: Boolean,
        default: true
    },
    events: [{
        title: String,
        description: String,
        venue: String,
        start: String,
        end: String,
        allDay: Boolean,
        backgroundColor: String,
        borderColor: String
    }]
})

module.exports = {
    User
}