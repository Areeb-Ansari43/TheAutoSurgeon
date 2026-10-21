ALTER TABLE `inquiries` ADD `userId` int;--> statement-breakpoint
ALTER TABLE `inquiries` ADD CONSTRAINT `inquiries_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `inquiries_user_created_idx` ON `inquiries` (`userId`,`createdAt`);