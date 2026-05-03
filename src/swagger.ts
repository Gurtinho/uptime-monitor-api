import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Uptime Monitor API',
      version: '1.0.0',
      description: 'API to monitor the uptime of services'
    }
    // servers: [
    //   {
    //     url: 'http://localhost:3000',
    //   },
    // ],
  },
  apis: ['./src/**/*.ts']
};

export const swaggerSpec = swaggerJSDoc(options);
