import { Router } from 'express';

/**
 * @swagger
 *
 * tags:
 *  - name: Main
 */

export const mainRouter = Router();

/**
 *  @openapi
 * /:
 *  get:
 *      tags:
 *      - Main
 *      description: Hello world
 *      responses:
 *          200:
 *              description: Returns Hello Wold! string
 */
mainRouter.get('/', (req, res) => {
	res.send('Hello World!');
});
