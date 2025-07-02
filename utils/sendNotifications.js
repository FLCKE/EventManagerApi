import Event from "../models/eventModel.js";
import notificationModel from "../models/notificationModel.js";
import Registration from "../models/registrationModel.js";
import User from "../models/userModel.js";
import { sendMail } from "./mailSender.js"; // Assurez-vous d'importer votre fonction d'envoi d'email
// import ton service d'envoi d'email ou notification ici

export async function sendTomorrowEventNotifications() {
    // Calcule la date de demain (UTC)
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const afterTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2);

    // Récupère tous les événements prévus pour demain
    const events = await Event.find({
        date: { $gte: tomorrow, $lt: afterTomorrow }
    });

    for (const event of events) {
        // Récupère tous les participants inscrits à cet événement
        const registrations = await Registration.find({ eventId: event._id });
        for (const reg of registrations) {
            const user = await User.findById(reg.userId);
            if (user && user.email) {
                // Envoie une notification à l'utilisateur
                // verifie si l'utilisateur a déjà reçu une notification pour cet événement


                const existingNotification = await notificationModel.find({
                    userId: user._id,
                    message: `Rappel: votre événement "${event.title}" a lieu demain !`
                });
                if (existingNotification.length > 0) {
                    console.log(`Notification déjà envoyée à ${user.email} pour l'événement "${event.title}"`);
                } else {
                    await notificationModel.create({
                        userId: user._id,
                        eventId: event._id,
                        message: `Rappel: votre événement "${event.title}" a lieu demain !`,
                        read: false // Notification non lue par défaut
                    });
                    await sendMail({ to: user.email, subject: "Rappel evenement !!!", html: `Rappel: votre événement "${event.title}" a lieu demain !` });
                    console.log(`Notification envoyée à ${user.email} pour l'événement "${event.title}"`);
                }

            }
        }
    }
}