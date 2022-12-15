const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    dob: {type: Date},
    age: {type: Number},
    email: {type: String},
    

});


module.exports = mongoose.model('Employee', employeeSchema);