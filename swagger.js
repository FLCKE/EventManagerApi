import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "EventManager API",
            version: "1.0.0",
            description: "API pour la gestion d'événements, d'inscriptions, de notifications et d'utilisateurs.",
        },
        servers: [
            { url: "http://localhost:5000/api" }
        ],
        components: {
            schemas: {
                Event: {
                    type: "object",
                    properties: {
                        _id: { type: "string", example: "e1d2c3b4-5678-1234-9abc-1234567890ab" },
                        title: { type: "string", example: "Conférence IA 2025" },
                        description: { type: "string", example: "Une conférence sur l'intelligence artificielle." },
                        date: { type: "string", format: "date-time", example: "2025-07-10T09:00:00.000Z" },
                        capacity: { type: "integer", example: 200 },
                        price: { type: "number", example: 49.99 },
                        location: { type: "string", example: "Paris, France" },
                        imageUrl: { type: "string", example: "https://res.cloudinary.com/moncompte/image/upload/v1234567890/event.jpg" },
                        createdBy: { type: "string", example: "u1d2c3b4-5678-1234-9abc-1234567890ab" },
                        createdAt: { type: "string", format: "date-time", example: "2025-07-01T12:00:00.000Z" }
                    }
                },
                User: {
                    type: "object",
                    properties: {
                        _id: { type: "string", example: "u1d2c3b4-5678-1234-9abc-1234567890ab" },
                        name: { type: "string", example: "Alice Dupont" },
                        email: { type: "string", example: "alice@email.com" },
                        role: { type: "string", example: "organizer" },
                        phone: { type: "string", example: "+33612345678" },
                        imageUrl: { type: "string", example: "https://res.cloudinary.com/moncompte/image/upload/v1234567890/user.jpg" },
                        createdAt: { type: "string", format: "date-time", example: "2025-07-01T12:00:00.000Z" }
                    }
                },
                Notification: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },
                        userId: { type: "string" },
                        eventId: { type: "string" },
                        message: { type: "string" },
                        read: { type: "boolean" },
                        createdAt: { type: "string", format: "date-time" }
                    }
                },
                Registration: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },
                        userId: { type: "string" },
                        eventId: { type: "string" },
                        createdAt: { type: "string", format: "date-time" }
                    }
                }
            }
        }
    },
    apis: ["./routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
export { swaggerUi };