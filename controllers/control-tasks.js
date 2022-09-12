const TaskModel = require('../models/task');
const asyncWrapper = require('../middleware/async-wrapper');
const {createCustomError} = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await TaskModel.find({});
    res.status(200).json({tasks});
});

const createTask = asyncWrapper(async (req, res, next) => {
    const task = await TaskModel.create(req.body);
    res.status(201).json({task});
});

const getSingleTask = asyncWrapper(async (req, res, next) => {
    const {id: taskID} = req.params;
    const task = await TaskModel.findOne({_id: taskID});
    if(!task){
        return next(createCustomError(`No task with id: ${taskID}`, 404));
    }
    res.status(200).json({task});
});

const deleteTask = asyncWrapper(async (req, res, next) => {
    const {id: taskID} = req.params;
    const task = await TaskModel.findOneAndDelete({_id: taskID});
    if(!task){
        return next(createCustomError(`No task with id: ${taskID}`, 404));
    }
    res.status(200).json({task});
});

const updateTask = asyncWrapper(async (req, res, next) => {
    const {id: taskID} = req.params;
    const task = await TaskModel.findOneAndUpdate({_id: taskID}, req.body, {
        new: true,
        runValidators: true
    });

    if(!task){
        return next(createCustomError(`No task with id: ${taskID}`, 404));
    }
    res.status(200).json({task});
});

const replaceTask = asyncWrapper(async (req, res, next) => {
    const {id: taskID} = req.params;

    //the default value of 'completed' is false that is set from TaskSchema
    //so in the case of 'completed' is not in req.body, it is existed with 'false' 
    const task = await TaskModel.findOneAndReplace({_id: taskID}, req.body, {
        new: true,
        runValidators: true
    });

    if(!task){
        return next(createCustomError(`No task with id: ${taskID}`, 404));
    }
    res.status(200).json({task});
});


module.exports = { 
    getAllTasks,
    getSingleTask,
    createTask,
    updateTask,
    deleteTask,
    replaceTask
}