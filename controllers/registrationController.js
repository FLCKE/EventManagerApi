import Registration from '../models/registrationModel.js';

export const getUserRegistrations = async (req, res) => {
  const registrations = await Registration.find({ userId: req.user.id }).populate('eventId');
  res.json(registrations);
};

export const registerToEvent = async (req, res) => {
  const { eventId } = req.body;

  const existing = await Registration.findOne({ userId: req.user.id, eventId });
  if (existing) return res.status(409).json({ message: 'Already registered' });

  const registration = await Registration.create({ userId: req.user.id, eventId });
  res.status(201).json(registration);
};

export const unregisterFromEvent = async (req, res) => {
  await Registration.findByIdAndDelete(req.params.id);
  res.json({ message: 'Successfully unregistered' });
};
