CREATE TABLE `appointments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`reference` varchar(40) NOT NULL,
	`kind` enum('booking','quote') NOT NULL,
	`userId` int,
	`name` varchar(100) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(32) NOT NULL,
	`registration` varchar(16) NOT NULL,
	`vehicle` varchar(120),
	`postcode` varchar(16),
	`service` varchar(80) NOT NULL,
	`preferredDate` date,
	`preferredTime` varchar(5),
	`notes` text,
	`status` enum('requested','confirmed','completed','cancelled') NOT NULL DEFAULT 'requested',
	`consentAt` timestamp NOT NULL,
	`requestKey` varchar(36) NOT NULL,
	`payloadHash` char(64) NOT NULL,
	`authBinding` char(64) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `appointments_id` PRIMARY KEY(`id`),
	CONSTRAINT `appointments_reference_unique` UNIQUE(`reference`),
	CONSTRAINT `appointments_requestKey_unique` UNIQUE(`requestKey`)
);
--> statement-breakpoint
CREATE TABLE `customer_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`phone` varchar(32),
	`postcode` varchar(16),
	`vehicle` varchar(120),
	`registration` varchar(16),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `customer_profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `customer_profiles_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `inquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`reference` varchar(40) NOT NULL,
	`name` varchar(100) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(32),
	`subject` varchar(160) NOT NULL,
	`message` text NOT NULL,
	`status` enum('received') NOT NULL DEFAULT 'received',
	`consentAt` timestamp NOT NULL,
	`requestKey` varchar(36) NOT NULL,
	`payloadHash` char(64) NOT NULL,
	`authBinding` char(64) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `inquiries_id` PRIMARY KEY(`id`),
	CONSTRAINT `inquiries_reference_unique` UNIQUE(`reference`),
	CONSTRAINT `inquiries_requestKey_unique` UNIQUE(`requestKey`)
);
--> statement-breakpoint
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `customer_profiles` ADD CONSTRAINT `customer_profiles_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `appointments_user_created_idx` ON `appointments` (`userId`,`createdAt`);--> statement-breakpoint
CREATE INDEX `appointments_status_created_idx` ON `appointments` (`status`,`createdAt`);--> statement-breakpoint
CREATE INDEX `customer_profiles_registration_idx` ON `customer_profiles` (`registration`);--> statement-breakpoint
CREATE INDEX `inquiries_status_created_idx` ON `inquiries` (`status`,`createdAt`);