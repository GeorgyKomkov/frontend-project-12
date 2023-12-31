lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

deploy:
	npm ci && cd ./frontend && npm ci && npm run build:deploy

start:
	make start-backend & make start-frontend
