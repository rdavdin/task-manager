const express = require("express");
const {
    getAllTasks,
    getSingleTask,
    createTask,
    updateTask,
    deleteTask,
    replaceTask
} = require("../controllers/control-tasks");

const router = express.Router();

router.get('/', getAllTasks);
router.post('/', createTask);
router.get('/:id', getSingleTask);
router.patch('/:id', updateTask);
router.put('/:id', replaceTask);
router.delete('/:id', deleteTask);

module.exports = router;