module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify : {
      app : {
        files : { 'dist/index.js' : ['index.js'] }
      }
    }
  })
}