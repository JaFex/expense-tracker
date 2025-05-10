import request from 'supertest';
import { expect, test } from 'vitest';
import { app } from '../app';

test('Root url should return hello world', async () => {
	const res = await request(app).get('/').expect(200);

	expect(res.text).toBe('Hello World!');
});
