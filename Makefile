# Makefile for running "npm run dev" and "php -S 127.0.0.1:8000"

.PHONY: dev server migrate

dev:
	npm run dev
server:
	cd ./server && php -S 127.0.0.1:8000
migrate:
	cd ./server/database && php Migrate.php
predict:
	cd./python && py main.py