import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Property Backend API",
      version: "1.0.0",
      description:
        "REST API for a Headless WordPress Property Platform built with Node.js, Express, TypeScript and WPGraphQL",
    },
    servers: [
    {
      url:
        process.env.NODE_ENV === "production"
          ? "https://leadtap-properties.onrender.com"
          : "http://localhost:5000",
    },
  ],
  },

  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;