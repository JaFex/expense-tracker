CREATE TYPE "public"."countries" AS ENUM('en-US', 'en-GB', 'pt-BR', 'pt-PT', 'es-ES', 'es-MX', 'fr-FR', 'de-DE', 'it-IT', 'ja-JP', 'zh-CN', 'zh-TW', 'ru-RU', 'ar-SA', 'hi-IN', 'ko-KR', 'nl-NL', 'sv-SE', 'tr-TR', 'pl-PL', 'da-DK', 'fi-FI', 'no-NO', 'cs-CZ', 'he-IL', 'th-TH', 'id-ID', 'ms-MY', 'vi-VN', 'el-GR', 'ro-RO', 'hu-HU', 'uk-UA', 'ca-ES', 'hr-HR');--> statement-breakpoint
CREATE TYPE "public"."currencies" AS ENUM('USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'CNY', 'INR', 'BRL', 'CHF', 'SEK', 'NOK', 'DKK', 'RUB', 'MXN', 'SGD', 'HKD', 'NZD', 'ZAR');--> statement-breakpoint
CREATE TYPE "public"."date_format" AS ENUM('YYYY-MM-DD', 'DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY/MM/DD', 'DD-MM-YYYY', 'MM-DD-YYYY', 'D MMMM YYYY', 'MMMM D, YYYY', 'D MMM YYYY', 'MMM D, YYYY', 'YYYY-MM-DD HH:mm', 'DD/MM/YYYY HH:mm', 'YYYY-MM-DDTHH:mm:ssZ', 'ddd, D MMM YYYY', 'dddd, D MMMM YYYY');--> statement-breakpoint
CREATE TYPE "public"."timezones" AS ENUM('UTC', 'Europe/Lisbon', 'Atlantic/Azores', 'Europe/London', 'America/New_York', 'America/Los_Angeles', 'Europe/Paris', 'Asia/Tokyo', 'Australia/Sydney', 'America/Chicago', 'America/Sao_Paulo', 'Asia/Shanghai', 'Asia/Dubai');--> statement-breakpoint
CREATE TABLE "settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"currency" "currencies" DEFAULT 'EUR',
	"language" "countries" DEFAULT 'pt-PT',
	"timezone" timezones DEFAULT 'Europe/Lisbon'
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"firstName" varchar(255) NOT NULL,
	"lastName" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "settings" ADD CONSTRAINT "settings_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;