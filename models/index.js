// Require mongoose
let mongoose = require('mongoose')

// Provide a mongo connection string
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/hunters',{
    useNewUrlParser: true,
    useUnifiedTopology: true
} )

// Export all the other mongoose models in the models folder
module.exports.Bounty = require('./bounty')
