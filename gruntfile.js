module.exports = function (grunt) {
  grunt.initConfig({
    coffee: {
      compile: {
        options: {
          bare: true
        },          
        files: {
          'js/utils/general.js': 'coffee/utils/general.coffee',
          'js/utils/arrays.js': 'coffee/utils/arrays.coffee'
        }
      }
    },
    watch: {
      src: {
        files: ['coffee/**/*.coffee'],
        tasks: ['coffee']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
};