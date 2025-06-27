import Event from '../models/eventModel.js';

export const getAllEvents = async (req, res) => {
    const { page , limit,dateLimit, location} = req.query;
    const now = new Date();
    // Filtre de base : événements à venir
    let filter = { date: { $gte: now } };
    // Si des paramètres de date ou de localisation sont fournis, les ajouter au filtre
    if (dateLimit) {
      filter.date = { $gte: dateLimit };
    }
    if (location) {
  filter.location = location;
  }
    if (page && limit) {
      const skip = (page - 1) * limit;
      const total = await Event.countDocuments();
      const totalPages = Math.ceil(total / limit);
      const events = await Event.find(filter)
        .skip(skip)
        .limit(limit)
        .populate('createdBy', 'name email');
      return res.json({
        events,
        total,
        totalPages,
        currentPage: parseInt(page),
        limit: parseInt(limit)
      });
    }
    if (dateLimit || location) {
      const events = await Event.find(filter).populate('createdBy', 'name email');
      return res.json(events);
    }
  // If no pagination, return all events
  const events = await Event.find().populate('createdBy', 'name email role');
  res.json(events);
};

export const getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id).populate('createdBy', 'name email');
  if (!event) return res.status(404).json({ message: 'Event not found' });
  res.json(event);
};

export const createEvent = async (req, res) => {
    console.log(re)
    const {title,description,date,location}= req.body;
  const event = await Event.create({ title,description,date,location, createdBy: req.user.id });
  res.status(201).json(event);
};

export const updateEvent = async (req, res) => {
  const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: 'Event deleted' });
};
