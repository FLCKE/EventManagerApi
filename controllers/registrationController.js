import Event from '../models/eventModel.js';
import Registration from '../models/registrationModel.js';

export const getUserRegistrations = async (req, res) => {
  const {type,id} = req.query;
  const date = new Date();
  if (!id) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  let filter = {userId: id};
  if (type === 'upcoming') {
    filter = {...filter, eventDate: { $gte: date } };
  } else if (type === 'past') {
    filter = { ...filter, eventDate: { $lt: date } };
  }else if (type === 'now') {
    filter = { ...filter, eventDate: { $eq: date } };
  }else { 
    return res.status(400).json({ message: 'Invalid type parameter' });
  }

  const registrations = await Registration.find(filter).populate('eventId');
  res.json(registrations);
};
export const getRegisterByOrganizer = async (req, res) => {
  const organizerId = req.params.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  if (!organizerId) {
    return res.status(400).json({ message: 'Organizer ID is required' });
  }
  const events = await Event.find({ createdBy: organizerId });
  if (!events || events.length === 0) {
    return res.status(404).json({ message: 'No events found for this organizer' });
  }
  const eventIds = events.map(event => event._id);

  // Agrégation pour regrouper par participant
  const registrations = await Registration.aggregate([
    { $match: { eventId: { $in: eventIds } } },
    {
      $group: {
        _id: "$userId",
        registrations: { $push: "$eventId" }
      }
    }
  ]);

  // Pagination sur les participants
  const total = registrations.length;
  const totalPages = Math.ceil(total / limit);
  const paginated = registrations.slice((page - 1) * limit, page * limit);

  // Peupler les infos utilisateur et événements
  const result = await Promise.all(paginated.map(async (item) => {
    const user = await Registration.populate(
      { userId: item._id },
      { path: "userId", select: "name email phone" }
    );
    const events = await Event.find({ _id: { $in: item.registrations } }).select("title");
    return {
      user: user.userId,
      events
    };
  }));

  res.json({
    register: result,
    total,
    totalPages,
    currentPage: page,
    limit
  });
};
 

export const registerToEvent = async (req, res) => {
  const { eventId,id } = req.body;
  if (!eventId || !id) {
    return res.status(400).json({ message: 'Event ID and User ID are required' });
  }
  const existing = await Registration.findOne({ userId: id, eventId });
  if (existing) return res.status(409).json({ message: 'Already registered' });

  const registration = await Registration.create({ userId: id, eventId });
  res.status(201).json(registration);
};

export const unregisterFromEvent = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'Registration ID is required' });
  }
  const registration = await Registration.findById(req.params.id);
  if (!registration) {
    return res.status(404).json({ message: 'Registration not found' });
  }
  await Registration.findByIdAndDelete(req.params.id);
  res.json({ message: 'Successfully unregistered' });
};
