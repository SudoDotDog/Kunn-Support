# Paths
build := typescript/tsconfig.build.json
dev := typescript/tsconfig.dev.json

# NPX functions
tsc := node_modules/.bin/tsc
ts_node := node_modules/.bin/ts-node
mocha := node_modules/.bin/mocha

main: run

run:
	@NODE_ENV=development $(ts_node) example/test.ts

dev:
	@echo "[INFO] Building for development"
	@NODE_ENV=development $(tsc) --p $(dev)

build:
	@echo "[INFO] Building for production"
	@NODE_ENV=production $(tsc) --p $(build)

tests:
	@echo "[INFO] Testing with Mocha"
	@NODE_ENV=test $(mocha)

cov:
	@echo "[INFO] Testing with Nyc and Mocha"
	@NODE_ENV=test \
	nyc $(mocha)

install:
	@echo "[INFO] Installing dev Dependencies"
	@yarn install --production=false

install-prod:
	@echo "[INFO] Installing Dependencies"
	@yarn install --production=true

license-typescript: clean-typescript
	@echo "[INFO] Sign files"
	@NODE_ENV=development $(ts_node) script/license.ts typescript

clean-typescript:
	@echo "[INFO] Cleaning release files"
	@NODE_ENV=development $(ts_node) script/clean-app.ts typescript

publish-typescript: install tests license-typescript build
	@echo "[INFO] Publishing package"
	@cd app/typescript && npm publish --access=public

license-go: clean-go
	@echo "[INFO] Sign files"
	@NODE_ENV=development $(ts_node) script/license.ts go

clean-go:
	@echo "[INFO] Cleaning release files"
	@NODE_ENV=development $(ts_node) script/clean-app.ts go

publish-go: install tests license-go build
	@echo "[INFO] Publishing package"
	@cd app/go && npm publish --access=public
