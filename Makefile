test:
	@./node_modules/.bin/mocha --reporter nyan

test_debug:
	@./node_modules/.bin/mocha --debug-brk

coverage:
	./node_modules/.bin/jscoverage --no-highlight lib lib-cov
	LIB_COV=1 ./node_modules/.bin/mocha -R html-cov > coverage.html
	rm -rf lib-cov

.PHONY: test
