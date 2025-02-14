const dbmongo = require('mongoose')

const tabletask = new dbmongo.Schema({
  title: {
    type: String,
    required: true,
    default: 'No title'
  },
  description: {
    type: String,
    required: true,
    default: 'No description'
  },
  status: {
    type: String,
    enum: ['Completed', 'Pending'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
const myclass = new dbmongo.Schema(tabletask)
const modelTask = dbmongo.model("t_task",myclass) 

const allTasks = async (req, res) => {
  try {
    const tasks = await modelTask.find().sort({ createdAt: -1 });
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found' });
    }
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
  
  const AddTask = (req, res) => {
    try {
      const data = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status || 'Pending',
        createdAt: new Date()
      }
      const newTask = new modelTask(data)
      newTask.save()
      res.status(201).json({ message: 'Add task successfully' } );
      res.json(newTask)
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  const UpdateTask = async (req, res) => {
    try {
      const taskId = req.params.id;
      const updatedData = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
      };
      const updatedTask = await modelTask.findByIdAndUpdate(taskId, updatedData);
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(updatedTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  const DeleteTask = async (req, res) => {
    try {
      const deleteId = req.params.id;
      console.log("........................  " + deleteId);
      const getTask = await modelTask.findByIdAndDelete(deleteId);
      !getTask &&  res.status(404).json({ message: 'Task not found' })
      await getTask.deleteOne()
      res.status(200).json({ message: `Delete task ${deleteId} successfully`  });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const DeleteAllTask = async (req, res) => {
    try {
      await modelTask.deleteMany();
      res.status(200).json({ message: 'Delete all tasks successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  module.exports = { allTasks, AddTask, UpdateTask, DeleteTask ,DeleteAllTask }; 