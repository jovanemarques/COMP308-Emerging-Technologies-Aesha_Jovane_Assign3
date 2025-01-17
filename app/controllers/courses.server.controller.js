﻿const mongoose = require('mongoose');
const Course = mongoose.model('Course');
const Student = require('mongoose').model('Student');

//
function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error';
    }
};
//
exports.create = function (req, res) {
    const course = new Course(req.body);
    //course.student = req.body.student_number;
    console.log(req.body)
    Student.findOne({student_number: req.student_number}, (err, student) => {

        if (err) { return getErrorMessage(err); }
        //
        req.id = student._id;
        console.log('student._id',req.id);
    }).then( function () 
    {
        course.students = [...course.students, req.id]
        console.log('req.student._id', req.id);

        course.save((err) => {
            if (err) {
                console.log('error', getErrorMessage(err))

                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json(course);
            }
        });
    
    });
};
//
exports.list = function (req, res) {
    Course
    .find()
    //.sort('-created')
    .populate('students', 'firstName lastName fullName')
    .exec((err, courses) => {
    if (err) {
        return res.status(400).send({
            message: getErrorMessage(err)
        });
    } else {
        res.status(200).json(courses);
    }
});
};
//
exports.courseByID = function (req, res, next, id) {
    Course
    .findById(id)
    .populate('students', 'firstName lastName fullName')
    .exec((err, course) => {if (err) return next(err);
    if (!course) return next(new Error('Failed to load course '
            + id));
        req.course = course;
        console.log('in courseById:', req.course)
        next();
    });
};
//
exports.read = function (req, res) {
    res.status(200).json(req.course);
};
//
exports.update = function (req, res) {
    console.log('in update:', req.course)
    const course = req.course;
    course.course_code = req.body.course_code;
    course.course_name = req.body.course_name;
    course.section = req.body.section;
    course.semester = req.body.semester;
    course.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
};
//
exports.delete = function (req, res) {
    const course = req.course;
    course.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
};
//The hasAuthorization() middleware uses the req.course and req.user objects
//to verify that the current user is the creator of the current course
exports.hasAuthorization = function (req, res, next) {
    console.log('in hasAuthorization - course.student: ',req.course.students)
    console.log('in hasAuthorization - student: ', req.id)

    if (req.course.students.filter(s => s.id === req.id).length === 0) {
        return res.status(403).send({
            message: 'Student is not authorized'
        });
    }
    next();
};
