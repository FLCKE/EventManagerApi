import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"; // Assurez-vous que le chemin est correct
import authRoutes from "./routes/authRoutes.js"
import eventRoutes from "./routes/eventRoutes.js"
import notificationRoutes from "./routes/notificationRoutes.js"
import registrationRoutes from "./routes/registrationRoutes.js"
import rateLimiter from "./middlewares/rate-limiter.js"
import favoriteRoutes from "./routes/favoriteRoutes.js";
import statRoutes from "./routes/statRoutes.js"; // Assurez-vous que le chemin est correct
import cron from "node-cron";
import { sendTomorrowEventNotifications } from "./utils/sendNotifications.js";

const app = express();
app.use(express.json()); // Middleware pour parser le JSON dans les requêtes

app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Middleware pour activer CORS
app.use(rateLimiter);
cron.schedule("0 8 * * *", () => {
    sendTomorrowEventNotifications();
});
app.get("/", (req, res) => {
    res.send("API OK ✅");
});
// app.use('/api/payment', payementRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/user", userRoutes); // Assurez-vous que le chemin est correct
app.use("/api/auth", authRoutes); // Assurez-vous que le chemin est correct
app.use("/api/event", eventRoutes); // Assurez-vous que le chemin est correct
app.use("/api/registration", registrationRoutes); // Assurez-vous que le chemin est correct
app.use("/api/notification", notificationRoutes); // Assurez-vous que le chemin est correct
app.use('/api/stat', statRoutes); // Assurez-vous que le chemin est correct
export default app; // Exporter l'application Express pour l'utiliser dans d'autres fichiers