import Task from '../models/Tasks.js';
export const getTasks = async (req, res) =>{
    try {
        const filter = {};
        if (req.query.createdBy) {
            filter.createdBy = req.query.createdBy;
        }
        const tasks = await Task.find(filter);
        res.status(200).json({success: true, data: tasks});
    }
    catch(err){
        console.error(`Error: ${err.message}`);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const createTask = async (req, res) => {
    const task = req.body;

    try {
        console.log("Title: " + task.title);
        const newTask = new Task({
            title: task.title,
            urgency: task.urgency,
            createdBy: task.createdBy
        });
        const savedTask = await newTask.save();
        res.status(201).json({
            success: true,
            message: 'Task createdsuccessfully',
            data: savedTask
        })
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send("Internal Server Error");
    }
};

export const deleteTaskByTitle = async (req, res) => {
    const { title } = req.params; // Get title from URL parameter
    
    // Validate title parameter
    if (!title) {
        return res.status(400).json({
            success: false,
            message: 'Title parameter is required'
        });
    }

    try {
        console.log(`Attempting to delete task with title: ${title}`);
        
        // Find and delete the task by title
        const deletedTask = await Task.findOneAndDelete({ title: title });
        
        if (!deletedTask) {
            return res.status(404).json({
                success: false,
                message: `Task with title "${title}" not found`
            });
        }

        console.log(`Successfully deleted task: ${deletedTask.title}`);
        
        res.status(200).json({
            success: true,
            message: `Task "${title}" deleted successfully`,
            data: deletedTask
        });
        
    } catch (error) {
        console.error(`Error deleting task: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};
export const updateTaskUrgency = async (req, res) => {
    const { title } = req.params; // Get title from URL parameter
    const { urgency } = req.body; // Get new urgency from request body
    
    // Validate parameters
    if (!title) {
        return res.status(400).json({
            success: false,
            message: 'Title parameter is required'
        });
    }
    
    if (urgency === undefined || urgency === null) {
        return res.status(400).json({
            success: false,
            message: 'Urgency value is required in request body'
        });
    }

    // Validate urgency is a number
    if (typeof urgency !== 'number' || isNaN(urgency)) {
        return res.status(400).json({
            success: false,
            message: 'Urgency must be a valid number'
        });
    }

    try {
        console.log(`Attempting to update task "${title}" urgency to: ${urgency}`);
        
        // Find and update the task by title
        const updatedTask = await Task.findOneAndUpdate(
            { title: title }, 
            { urgency: urgency },
            { new: true } // Return the updated document
        );
        
        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: `Task with title "${title}" not found`
            });
        }

        console.log(`Successfully updated task urgency: ${updatedTask.title} -> ${updatedTask.urgency}`);
        
        res.status(200).json({
            success: true,
            message: `Task "${title}" urgency updated successfully`,
            data: updatedTask
        });
        
    } catch (error) {
        console.error(`Error updating task urgency: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}
