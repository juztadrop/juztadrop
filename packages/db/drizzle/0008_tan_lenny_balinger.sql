CREATE TABLE "moderators" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"assigned_regions" text[] DEFAULT '{}',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "moderators_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "moderators" ADD CONSTRAINT "moderators_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "moderators_user_id_idx" ON "moderators" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "moderators_is_active_idx" ON "moderators" USING btree ("is_active");