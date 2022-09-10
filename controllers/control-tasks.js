const TaskModel = require('../models/task');

const getAllTasks = async function(req, res, next){
    try {
        const tasks = await TaskModel.find({});
        res.status(200).json({tasks});
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

const createTask = async function(req, res, next){
    try {
        const task = await TaskModel.create(req.body);
        res.status(201).json({task});
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

const getSingleTask = async function(req, res, next){
    try {
        const {id: taskID} = req.params;
        const task = await TaskModel.findOne({_id: taskID});
        if(!task){
            return res.status(404).json({msg: `task not found with id ${taskID}`});
        }
        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

const deleteTask = async function(req, res, next){
    try {
        const {id: taskID} = req.params;
        const task = await TaskModel.findOneAndDelete({_id: taskID});
        if(!task){
            return res.status(404).json({msg: `No task with id: ${taskID}`});
        }
        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

const updateTask = async function(req, res, next){
    try {
        const {id: taskID} = req.params;
        const task = await TaskModel.findOneAndUpdate({_id: taskID}, req.body, {
            new: true,
            runValidators: true
        });

        if(!task){
            return res.status(404).json({msg: `No task with id: ${taskID}`});
        }
        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

const replaceTask = async function(req, res, next){
    try {
        const {id: taskID} = req.params;

        //the default value of 'completed' is false that is set from TaskSchema
        //so in the case of 'completed' is not in req.body, it is existed with 'false' 
        const task = await TaskModel.findOneAndReplace({_id: taskID}, req.body, {
            new: true,
            runValidators: true
        });

        if(!task){
            return res.status(404).json({msg: `No task with id: ${taskID}`});
        }
        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({msg: error});
    }
}


module.exports = { 
    getAllTasks,
    getSingleTask,
    createTask,
    updateTask,
    deleteTask,
    replaceTask
}