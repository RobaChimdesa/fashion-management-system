import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Fashion Management System API",
      version: "1.0.0",
      description:
        "REST API for Ethiopian Fashion Management System",
    },

    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://YOUR-RENDER-URL.onrender.com/api/v1"
            : "http://localhost:5000/api/v1",

        description:
          process.env.NODE_ENV === "production"
            ? "Production Server"
            : "Local Server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: [
    "./src/modules/**/*.ts",
  ],
};

export const swaggerSpec =
  swaggerJsdoc(options);