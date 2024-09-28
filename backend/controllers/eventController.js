import Event from "../models/event.js";

// Create a new event
export const createEvent = async (req, res) => {
  try {
    const { name, description, date, clubId } = req.body;

    const newEvent = new Event({
      name,
      description,
      date,
      club: clubId, // Reference to the club conducting the event
      status: "upcoming", // Default status
    });

    const savedEvent = await newEvent.save();

    // Add the event to the club's events_conducted list
    await Club.findByIdAndUpdate(clubId, {
      $push: { events_conducted: savedEvent._id },
    });

    res.status(201).json(savedEvent);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating event", error: error.message });
  }
};

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("club");
    res.json(events);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching events", error: error.message });
  }
};

// Get a single event by ID
export const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId).populate("club");
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching event", error: error.message });
  }
};

// Postpone an event
export const postponeEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { newDate } = req.body; // Expecting the new date to be passed in the request body

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { date: newDate, status: "upcoming" }, // Optionally update status
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(updatedEvent);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error postponing event", error: error.message });
  }
};

// Update an event
export const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { name, description, date, status } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { name, description, date, status },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(updatedEvent);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating event", error: error.message });
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Optionally, remove the event reference from the related club
    await Club.findByIdAndUpdate(deletedEvent.club, {
      $pull: { events_conducted: eventId },
    });

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting event", error: error.message });
  }
};

// Register a user for an event
export const registerForEvent = async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    const event = await Event.findById(eventId);
    const user = await User.findById(userId);

    if (!event || !user) {
      return res.status(404).json({ message: "Event or User not found" });
    }

    // Generate a QR code for the user's ID
    const qrCode = await qrcode.toDataURL(userId.toString());

    res.json({
      message: "User registered for event",
      qrCode,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering for event", error: err.message });
  }
};

// Mark attendance for a user via QR code
export const markAttendance = async (req, res) => {
  try {
    const { eventId, userId } = req.body;

    const event = await Event.findById(eventId);
    const user = await User.findById(userId);

    if (!event || !user) {
      return res.status(404).json({ message: "Event or User not found" });
    }

    if (!event.attendance.includes(userId)) {
      event.attendance.push(userId);
      await event.save();
    }

    res.json({ message: "Attendance marked successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error marking attendance", error: err.message });
  }
};

// Get list of users registered for an event
export const getRegisteredUsers = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId).populate(
      "attendance",
      "name email username"
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({
      message: "List of registered users",
      registeredUsers: event.attendance,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving registered users",
      error: err.message,
    });
  }
};
