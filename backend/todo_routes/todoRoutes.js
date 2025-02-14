const express = require('express')
const router = express.Router()
const {allTasks , AddTask , UpdateTask , DeleteTask , DeleteAllTask} = require('../task_controller/controller')

router.route('/').get(allTasks)
router.route('/add').post(AddTask)
router.route('/update/:id').put(UpdateTask)
router.route('/delete/:id').delete(DeleteTask)
router.route('/deleteall').delete(DeleteAllTask)

 
module.exports = router;  