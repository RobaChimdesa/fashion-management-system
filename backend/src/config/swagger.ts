import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.3",

    info: {
      title: "Fashion Design Management System API",
      version: "1.0.0",
      description:
        "REST API documentation for the Fashion Design Management System. This API supports authentication, products, orders, appointments, measurements, payments, reviews, notifications, analytics, and image uploads.",
      contact: {
        name: "Roba Chimdessa",
        email: "roba@gmail.com",
      },
    },

    servers: [
      {
        url: "http://localhost:5000/api/v1",
        description: "Local Development Server",
      },
      {
        // url: "https://YOUR-RENDER-URL.onrender.com/api/v1",
        url:"https://fashion-management-api.onrender.com/api/v1",
        description: "Production Server",
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

      schemas: {
        Product: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "6a313ba184aa575d5e1ab62e",
            },
            name: {
              type: "string",
              example: "Oromo Wedding Dress",
            },
            description: {
              type: "string",
            },
            category: {
              type: "string",
            },
            culturalStyle: {
              type: "string",
            },
            estimatedPrice: {
              type: "number",
              example: 18000,
            },
            averageRating: {
              type: "number",
              example: 4.8,
            },
            totalReviews: {
              type: "integer",
              example: 12,
            },
            isAvailable: {
              type: "boolean",
              example: true,
            },
          },
        },

        Order: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            productId: {
              type: "string",
            },
            customerId: {
              type: "string",
            },
            quantity: {
              type: "integer",
            },
            totalPrice: {
              type: "number",
            },
            status: {
              type: "string",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        Appointment: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            purpose: {
              type: "string",
            },
            appointmentDate: {
              type: "string",
              format: "date-time",
            },
            status: {
              type: "string",
            },
          },
        },

        Payment: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            amount: {
              type: "number",
            },
            paymentMethod: {
              type: "string",
            },
            transactionId: {
              type: "string",
            },
            status: {
              type: "string",
            },
          },
        },

        Review: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            rating: {
              type: "integer",
            },
            comment: {
              type: "string",
            },
          },
        },

        Measurement: {
          type: "object",
          properties: {
            chest: {
              type: "number",
            },
            waist: {
              type: "number",
            },
            hip: {
              type: "number",
            },
            shoulder: {
              type: "number",
            },
            sleeveLength: {
              type: "number",
            },
            inseam: {
              type: "number",
            },
            neck: {
              type: "number",
            },
            height: {
              type: "number",
            },
          },
        },

        Notification: {
          type: "object",
          properties: {
            title: {
              type: "string",
            },
            message: {
              type: "string",
            },
            isRead: {
              type: "boolean",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        AnalyticsDashboard: {
          type: "object",
          properties: {
            totalRevenue: {
              type: "number",
            },
            totalOrders: {
              type: "integer",
            },
            totalCustomers: {
              type: "integer",
            },
            totalProducts: {
              type: "integer",
            },
          },
        },

        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Something went wrong",
            },
          },
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
    "./src/modules/**/*.routes.ts",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;