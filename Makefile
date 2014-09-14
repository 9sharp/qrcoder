all: build

build: qrcoder.js

qrcoder.js: lib/*.js package.json
	@./support/browserify.sh > qrcoder.js

test: qrcoder.js
	node examples/browser
