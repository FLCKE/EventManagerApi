import eventModel from '../models/eventModel.js';
import Registration from '../models/registrationModel.js';

export const getOrganizerStats = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Organizer ID is required' });

    // 1. Total d'événements créés
    const totalEvents = await eventModel.countDocuments({ createdBy: id });

    // 2. Récupérer tous les events de l'organisateur
    const events = await eventModel.find({ createdBy: id });
    const eventIds = events.map(e => e._id);

    // 3. Nombre total de participants (toutes inscriptions)
    const totalParticipants = await Registration.countDocuments({ eventId: { $in: eventIds } });

    // 4. Somme totale des ventes
    const registrations = await Registration.find({ eventId: { $in: eventIds } })
        .populate('eventId', 'price title ')
        .populate('userId', 'name email phone');
    const totalSales = registrations.reduce((sum, reg) => {
        const price = reg.eventId?.price || 0;
        return sum + price;
    }, 0);
    const registrationsByDay = await Registration.aggregate([
        { $match: { eventId: { $in: eventIds } } },
        {
            $group: {
                _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                },
                count: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } }
    ]);

    const recentRegistrations = await Registration.find({ eventId: { $in: eventIds } })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('eventId', 'title price')
        .populate('userId', 'name email ');
    const lastEvent = await eventModel.findOne({ createdBy: id }).sort({ createdAt: -1 });

    let lastEventRegistrations = 0;
    if (lastEvent) {
        lastEventRegistrations = await Registration.countDocuments({ eventId: lastEvent._id });
    }

    res.json({
        recentRegistrations,
        registrationsByDay,
        totalEvents,
        totalParticipants,
        totalSales,
        lastEvent,
        lastEventRegistrations
        
    });
};