East Asian Width
================

A javascript implementation of full-width and half-width unicode character detector.

## Installation

#### [npm](https://www.npmjs.org/) [![NPM version](https://badge.fury.io/js/east-asian-width.svg)](https://www.npmjs.org/package/east-asian-width)

```sh
npm install east-asian-width
```

#### [bower](http://bower.io/) [![Bower version](https://badge.fury.io/bo/east-asian-width.svg)](https://github.com/vangie/east-asian-width/releases)

```sh
bower install east-asian-width
```
## Usage

```javascript
var should = require('chai').should(),
    east_asian_width = require('east-asian-width'),
    char_width = east_asian_width.char_width,
    str_width = east_asian_width.str_width,
    cjk_char_width = east_asian_width.cjk_char_width,
    cjk_str_width = east_asian_width.cjk_str_width;

char_width('杜'.codePointAt(0)).should.equal(2);
str_width('Coding is my life').should.equal(17);
cjk_char_width('Æ'.codePointAt(0)).should.equal(2);
cjk_str_width('Æ��').should.equal(6);
```

## Tests

    npm test


## Debug

Install node-inspector.

    npm install -g node-inspector

then run test in debug mode, listening on port 5858 and pause on first line.

    npm run-script test_debug

then start node-inspector on another console.

    node-inspector

then visit `http://127.0.0.1:8080/debug?port=5858` on browser.

## Release History

* 0.1.0 Initial release

## Author
> ![图片](https://dn-coding-net-production-static.qbox.me/7d422c9e-c2f9-4401-a846-8b4393cbd7b4.jpg?imageMogr2/auto-orient/format/jpeg/crop/!662x662a1a0/thumbnail/80)
> ####[Vangie Du](http://codelife.me)
> The future you must thank to the present hard working one.


## Links

1. [This is an implementation of wcwidth() and wcswidth() (defined in IEEE Std 1002.1-2001) for Unicode.](http://www.cl.cam.ac.uk/~mgk25/ucs/wcwidth.c)
2. [Unicode Standard Annex #11 EAST ASIAN WIDTH](http://www.unicode.org/reports/tr11/)
3. [determine whether a unicode character is fullwidth or halfwidth in C++](http://stackoverflow.com/questions/15114303/determine-whether-a-unicode-character-is-fullwidth-or-halfwidth-in-c)

