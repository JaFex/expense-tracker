import { integer, pgEnum, pgTable, uuid } from 'drizzle-orm/pg-core';
import { users } from './users';

export const currenciesEnum = pgEnum('currencies', [
	'USD',
	'EUR',
	'GBP',
	'CAD',
	'AUD',
	'JPY',
	'CNY',
	'INR',
	'BRL',
	'CHF',
	'SEK',
	'NOK',
	'DKK',
	'RUB',
	'MXN',
	'SGD',
	'HKD',
	'NZD',
	'ZAR',
]);

export const countriesEnum = pgEnum('countries', [
	'en-US',
	'en-GB',
	'pt-BR',
	'pt-PT',
	'es-ES',
	'es-MX',
	'fr-FR',
	'de-DE',
	'it-IT',
	'ja-JP',
	'zh-CN',
	'zh-TW',
	'ru-RU',
	'ar-SA',
	'hi-IN',
	'ko-KR',
	'nl-NL',
	'sv-SE',
	'tr-TR',
	'pl-PL',
	'da-DK',
	'fi-FI',
	'no-NO',
	'cs-CZ',
	'he-IL',
	'th-TH',
	'id-ID',
	'ms-MY',
	'vi-VN',
	'el-GR',
	'ro-RO',
	'hu-HU',
	'uk-UA',
	'ca-ES',
	'hr-HR',
]);

export const timezonesEnum = pgEnum('timezones', [
	'UTC',
	'Europe/Lisbon',
	'Atlantic/Azores',
	'Europe/London',
	'America/New_York',
	'America/Los_Angeles',
	'Europe/Paris',
	'Asia/Tokyo',
	'Australia/Sydney',
	'America/Chicago',
	'America/Sao_Paulo',
	'Asia/Shanghai',
	'Asia/Dubai',
]);

export const dateFormat = pgEnum('date_format', [
	'YYYY-MM-DD', // 2023-01-31
	'DD/MM/YYYY', // 31/01/2023
	'MM/DD/YYYY', // 01/31/2023
	'YYYY/MM/DD', // 2023/01/31
	'DD-MM-YYYY', // 31-01-2023
	'MM-DD-YYYY', // 01-31-2023
	'D MMMM YYYY', // 31 January 2023
	'MMMM D, YYYY', // January 31, 2023
	'D MMM YYYY', // 31 Jan 2023
	'MMM D, YYYY', // Jan 31, 2023
	'YYYY-MM-DD HH:mm', // 2023-01-31 14:30
	'DD/MM/YYYY HH:mm', // 31/01/2023 14:30
	'YYYY-MM-DDTHH:mm:ssZ', // ISO 8601 with timezone
	'ddd, D MMM YYYY', // Tue, 31 Jan 2023
	'dddd, D MMMM YYYY', // Tuesday, 31 January 2023
]);

export const settings = pgTable('settings', {
	id: uuid().defaultRandom().primaryKey(),
	userId: uuid()
		.notNull()
		.references(() => users.id),
	currency: currenciesEnum('currency').default('EUR'),
	country: countriesEnum('language').default('pt-PT'),
	timezone: timezonesEnum('timezone').default('Europe/Lisbon'),
});

export type Settings = typeof settings.$inferSelect;
