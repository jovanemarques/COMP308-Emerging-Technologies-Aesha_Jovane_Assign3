const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
    course_code: {
        type:String
    },
    course_name: {
        type:String
    },
    section: {
        type:Number
    },
    semester: {
        type:Number
    },
    created: {
        type: Date,
        default: Date.now
    }
});
mongoose.model('Course', CourseSchema);
