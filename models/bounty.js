// Require mongoose
let mongoose = require('mongoose')

// Make the Schema for bounty
let bountySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength :100,
        unique: true
    },
    wantedFor:{
        type: String,
        required: true,
    },
    client: {
        type: String,
        required: true
    },
    ship: String,
    lastSeen: String,
    hunters: Array,
    reward: {
        type: Number,
        default: 10000
    },
    captured:{
        type: Boolean,
        default: false
    }
})

// Create and export the model
/* let bountyModel = mongoose.model('Bounty', bountySchema)
module.exports = bountyModel */

module.exports = mongoose.model('Bounty', bountySchema)