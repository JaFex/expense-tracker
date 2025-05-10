import { app } from './app';
import { configs } from './configs/configs';
import { logger } from './tools/logger';

const port = configs.PORT;

app.listen(port, () => {
	logger.info(`Listening on port ${port}`);
});
