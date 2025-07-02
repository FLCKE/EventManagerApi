import Event from '../models/eventModel.js';
import Registration from '../models/registrationModel.js';

export const getAllEvents = async (req, res) => {
  const { page, limit, dateLimit, location } = req.query;
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
export const getAllEventsByOrganizer = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Organizer ID is required' });
  }
  const { page, limit, dateLimit, location } = req.query;
  let filter = { createdBy: id };
  if (dateLimit) {
    filter.date = { $gte: dateLimit };
  }
  if (location) {
    filter.location = location;
  }

  // Pagination
  let eventsQuery = Event.find(filter).populate('createdBy', 'name email');
  let total = await Event.countDocuments(filter);
  let totalPages = 1;
  if (page && limit) {
    const skip = (page - 1) * limit;
    eventsQuery = eventsQuery.skip(skip).limit(Number(limit));
    totalPages = Math.ceil(total / limit);
  }
  const events = await eventsQuery;

  // Pour chaque événement, récupérer les participants
  const eventsWithParticipants = await Promise.all(events.map(async (event) => {
    const registrations = await Registration.find({ eventId: event._id })
      .populate('userId', 'name email phone');
    return {
      ...event.toObject(),
      participants: registrations.map(r => r.userId)
    };
  }));

  return res.json({
    events: eventsWithParticipants,
    total,
    totalPages,
    currentPage: page ? parseInt(page) : 1,
    limit: limit ? parseInt(limit) : events.length
  });
};

export const getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id).populate('createdBy', 'name email');
  if (!event) return res.status(404).json({ message: 'Event not found' });
  res.json(event);
};

export const createEvent = async (req, res) => {
  const { title, description, date, location, capacity, price } = req.body;
  const imageUrl = req.file.path;

  const event = await Event.create({ title, description, date, location, createdBy: req.user.id, capacity, price, imageUrl });
  res.status(201).json(event);
};

export const updateEvent = async (req, res) => {
  try {
    // Vérifier si l'ID de l'événement est fourni
    if (!req.params.id) {
      return res.status(400).json({ message: 'Event ID is required' });
    }
    let updateData = req.body;
    console.log('updateData', req.file);

    // Vérifier si l'utilisateur a le droit de modifier l'événement
    const event = await Event.find({ _id: req.params.id });
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const updated = await Event.findByIdAndUpdate(req.params.id, updateData,{ new: true , runValidators: true } );
    res.status(200).json({
      message: 'Event updated successfully',
      event: updated
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }

};

export const deleteEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: 'Event deleted' });
};
