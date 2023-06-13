const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Creating a Task
router.post('/task', async (req, res) => {
  try {
    const { title, description, status } = req.body;
    console.log(title, description, status) 
    if (!title || !description || !status) {
      res.status(400).send({ error: "Title, Description, and Status are required" });
    } else {
      const task = await Task.create({
        title,
        description,
        status
      });
      console.log(task);
      res.status(201).send({ success: "Task added successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Task addition failed due to internal server error" });
  }
});

// Getting all tasks
router.get('/task', async (req, res) => {
  try {
    const tasks = await Task.find({});
    console.log(tasks);
    res.status(200).send({ tasks });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Getting only one task by its id
router.get('/task/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);
    console.log(task);
    res.status(200).send({ task });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Update a specific task
router.put('/task/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const { status } = req.body;
  
      if (!status) {
        return res.status(400).json({ error: 'Status is a required field.' });
      }
  
      await Task.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
        console.log("Call", status)
      res.status(200).send({ success: "Task status updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: 'Task status update failed due to internal server error' });
    }
  });
  

// Delete a specific task
router.delete('/task/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Task.findByIdAndDelete(id);
    res.status(200).send({ success: 'Task Deleted Successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Deletion Failed due to server error" });
  }
});

module.exports = router;
