test:
	@./node_modules/.bin/mocha --reporter nyan

test_debug:
	@./node_modules/.bin/mocha --debug-brk

lib-cov:
	@./node_modules/.bin/jscoverage lib $@

coverage:
	JS_COV=1 ./node_modules/.bin/mocha -R html-cov > coverage.html && open coverage.html
	rm -rf lib-cov

.PHONY: test
