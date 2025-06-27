import User from '../models/userModel.js';
import Event from '../models/eventModel.js';

export const addFavorite = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user.favorites.includes(req.body.eventId)) {
    user.favorites.push(req.body.eventId);
    await user.save();
  }
  res.json({ favorites: user.favorites });
};

export const removeFavorite = async (req, res) => {
  const user = await User.findById(req.user.id);
  user.favorites = user.favorites.filter(id => id !== req.body.eventId);
  await user.save();
  res.json({ favorites: user.favorites });
};

export const getFavorites = async (req, res) => {
  const user = await User.findById(req.user.id).populate('favorites');
  res.json({ favorites: user.favorites });
};