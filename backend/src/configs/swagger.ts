import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJsDoc.Options = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'Fintrak API',
			version: '0.0.1',
		},
	},
	apis: ['./src/routes/*.ts'],
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
