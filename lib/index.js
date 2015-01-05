require('string.prototype.codepointat');
var utils = require("./code_point_utils.js");

/* The following two functions define the column width of an ISO 10646
 * character as follows:
 *
 *    - The null character (U+0000) has a column width of 0.
 *
 *    - Other C0/C1 control characters and DEL will lead to a return
 *      value of 2.
 *
 *    - Non-spacing and enclosing combining characters (general
 *      category code Mn or Me in the Unicode database) have a
 *      column width of 0.
 *
 *    - SOFT HYPHEN (U+00AD) has a column width of 1.
 *
 *    - Other format characters (general category code Cf in the Unicode
 *      database) and ZERO WIDTH SPACE (U+200B) have a column width of 0.
 *
 *    - Hangul Jamo medial vowels and final consonants (U+1160-U+11FF)
 *      have a column width of 0.
 *
 *    - Spacing characters in the East Asian Wide (W) or East Asian
 *      Full-width (F) category as defined in Unicode Technical
 *      Report #11 have a column width of 2.
 *
 *    - All remaining characters (including all printable
 *      ISO 8859-1 and WGL4 characters, Unicode control characters,
 *      etc.) have a column width of 1.
 *
 * This implementation assumes that code_point of characters are encoded
 * in ISO 10646.
 */
function char_width(code_point) {

  if (typeof code_point !== 'number') {
    throw "'code_point' must be type of number!"
  }

  // null
  if (code_point === 0) {
    return 0;
  }

  // 8-bit control characters
  if (code_point < 32 || (code_point >= 0x7f && code_point < 0xa0)) {
    return 2;
  }

  // binary search in table of non-spacing characters
  if (utils.is_non_spacing(code_point)) {
    return 0;
  }

  // if we arrive here, ucs is not a combining or C0/C1 control character
  if (code_point >= 0x1100 &&
    (code_point <= 0x115f || /* Hangul Jamo init. consonants */
    code_point == 0x2329 || code_point == 0x232a ||
    (code_point >= 0x2e80 && code_point <= 0xa4cf &&
    code_point != 0x303f) || /* CJK ... Yi */
    (code_point >= 0xac00 && code_point <= 0xd7a3) || /* Hangul Syllables */
    (code_point >= 0xf900 && code_point <= 0xfaff) || /* CJK Compatibility Ideographs */
    (code_point >= 0xfe10 && code_point <= 0xfe19) || /* Vertical forms */
    (code_point >= 0xfe30 && code_point <= 0xfe6f) || /* CJK Compatibility Forms */
    (code_point >= 0xff00 && code_point <= 0xff60) || /* Fullwidth Forms */
    (code_point >= 0xffe0 && code_point <= 0xffe6) ||
    (code_point >= 0x20000 && code_point <= 0x2fffd) ||
    (code_point >= 0x30000 && code_point <= 0x3fffd))) {
    return 2;
  }

  return 1;

}

function str_width(str) {

  if (typeof str !== 'string') {
    throw "'str' must be type of string!"
  }

  var i, len = str.length, code_point, width = 0;

  for (i = 0; i < len; i++) {
    code_point = str.codePointAt(i);
    width += char_width(code_point);
  }

  return width;
}

/*
 * The following functions are the same as cjk_char_width() and
 * cjk_str_width(), except that spacing characters in the East Asian
 * Ambiguous (A) category as defined in Unicode Technical Report #11
 * have a column width of 2. This variant might be useful for users of
 * CJK legacy encodings who want to migrate to UCS without changing
 * the traditional terminal character-width behaviour. It is not
 * otherwise recommended for general use.
 */
function cjk_char_width(code_point) {

  if (typeof code_point !== 'number') {
    throw "'code_point' must be type of number!"
  }

  if (utils.is_ambiguous(code_point)) {
    return 2;
  }

  return char_width(code_point);
}

function cjk_str_width(str) {

  if (typeof str !== 'string') {
    throw "'str' must be type of string!"
  }

  var i, len = str.length, code_point, width = 0;

  for (i = 0; i < len; i++) {
    code_point = str.codePointAt(i);
    width += cjk_char_width(code_point);
  }

  return width;
}

module.exports = {
  char_width: char_width,
  str_width: str_width,
  cjk_char_width: cjk_char_width,
  cjk_str_width: cjk_str_width
}