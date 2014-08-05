module.exports = function (grunt) {
  grunt.initConfig({
    coffee: {
      compile: {
        options: {
          bare: true
        },          
        files: {
          'js/utils.js': 'coffee/utils/*.coffee',
          'js/integrators.js': 'coffee/integrators/*.coffee',
          'js/components/equation.js': 'coffee/components/equation.coffee',
          'js/components/graph.js': 'coffee/components/graph.coffee'
          
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