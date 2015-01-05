test:
	@./node_modules/.bin/mocha --reporter nyan

test_debug:
	@./node_modules/.bin/mocha --debug-brk

.PHONY: test
