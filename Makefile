.PHONY: help dev-api dev-view dev-dashboard build-api build-view build-dashboard db-generate db-migrate db-studio db-reset seed-admin-dev format format-check typecheck docker-dev docker-dev-down docker-dev-logs

# Dev-only: seed first moderator via api/scripts/seed-admin-dev.sh
API_BASE_URL ?= http://127.0.0.1:3001

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

dev-api: ## Start API server
	cd api && bun run dev

dev-view: ## Start view app
	cd view && bun run dev

dev-dashboard: ## Start dashboard app
	cd dashboard && bun run dev

build-api: ## Build API app
	cd api && bun run build

build-view: ## Build view app
	cd view && bun run build

build-dashboard: ## Build dashboard app
	cd dashboard && bun run build

db-generate: ## Generate database migrations
	cd api && bun run db:generate

db-migrate: ## Run database migrations
	cd api && bun run db:migrate

db-studio: ## Open Drizzle Studio
	cd api && bun run db:studio

db-reset: ## Reset database (removes volumes and re-runs migrations)
	docker-compose -f docker-compose.dev.yml down -v
	docker-compose -f docker-compose.dev.yml up -d postgres
	sleep 3
	cd api && bun run db:migrate

seed-admin-dev: ## Seed first moderator (dev). Use EMAIL=... or run interactively for prompt
	@email="$(EMAIL)"; \
	if [ -z "$$email" ]; then \
		if [ -t 0 ]; then \
			printf 'Moderator email: '; \
			IFS= read -r email; \
		else \
			echo 'error: set EMAIL for non-interactive use, e.g. make seed-admin-dev EMAIL=dev@example.com' >&2; \
			exit 1; \
		fi; \
	fi; \
	if [ -z "$$email" ]; then \
		echo 'error: email must not be empty' >&2; \
		exit 1; \
	fi; \
	API_BASE_URL=$(API_BASE_URL) MODERATOR_SEED_EMAIL="$$email" ./api/scripts/seed-admin-dev.sh

format: ## Format all code with Prettier
	bun run format

format-check: ## Check code formatting
	bun run format:check

typecheck: ## Type check all apps
	cd api && bun run typecheck
	cd ../view && bun run typecheck
	cd ../dashboard && bun run typecheck

docker-dev: ## Start PostgreSQL database with Docker Compose
	docker-compose -f docker-compose.dev.yml up

docker-dev-down: ## Stop PostgreSQL database
	docker-compose -f docker-compose.dev.yml down

docker-dev-logs: ## View PostgreSQL database logs
	docker-compose -f docker-compose.dev.yml logs -f postgres
