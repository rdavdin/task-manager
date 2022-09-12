const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: {
        type: String, 
        required: [true, 'must provide name'],
        trim: true,
        maxlength: [50, 'name cannot be more than 50 characters']
    },
    completed: {
        type: Boolean, 
        default: false
    }
});

module.exports = mongoose.model('Task', taskSchema);