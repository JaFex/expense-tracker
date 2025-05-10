import swaggerUi from 'swagger-ui-express';
import { app } from './app';
import { configs } from './configs/configs';
import { swaggerDocs } from './configs/swagger';
import { logger } from './tools/logger';

const port = configs.PORT;

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, () => {
	logger.info(`Listening on port ${port}`);
});
