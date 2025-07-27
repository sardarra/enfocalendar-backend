import Event from "../models/Events.js";

export const getEvents = async (req, res) => {
    try {
        const filter = {};
        if (req.query.createdBy) {
            filter.createdBy = req.query.createdBy;
        }
        const events = await Event.find(filter);
        res.status(200).json({ success: true, data: events });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const createEvent = async (req, res) => {
    const event = req.body; // User will send this data in the request body


    //if (event.name === undefined || event.name === '') {
    //    return res.status(400).send("Event name is required");
    //}
    try{
        const newEvent = new Event({
            title: event.title,
            description: event.description,
            startDate: event.startDate,
            endDate: event.endDate,
            startTime: event.startTime,
            endTime: event.endTime,
            allDay: event.allDay || false,
            location: event.location,
            createdBy: event.createdBy, // Replace with actual user ID or name
            color: event.color || '#ffffff'
        });
        const savedEvent = await newEvent.save();
        //res.status(201).send("Event created successfully");
        res.status(201).json({
            success: true,
            message: "Event created successfully",
            data: savedEvent
        })
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send("Internal Server Error");
    }
};

export const updateEvent = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json({ success: true, data: updatedEvent });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteEvent = async (req, res) => {
    // console.log("Attempting to delete event with ID:", req.params.id);
    const { id } = req.params;
    try {
        const deletedEvent = await Event.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).send("Event has not been not found");
        }
        res.status(200).send("Event deleted successfully");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send("Internal Server Error");
    }
}