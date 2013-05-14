module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        // stripBanners: true,
        // stripFooters: true,
        // banner: "var moip = {\n",
        // footer: "\n};",
        // separator: ','
      },
      dist: {
        src: ['src/libs/jquery.js','src/creditCard.js', 'src/calculator.js'],
        dest: 'build/assinaturas-siteapp.js'
      }
    },
    pkg: grunt.file.readJSON('package.json'),
    banner: "Assinaturas-Moip.js",
    uglify: {
      options: {
        banner: '/*! <%= banner %> - build date: <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/assinaturas-siteapp.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    qunit: {
      all: ['test/**/*.html']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat', 'qunit','uglify']);

  grunt.registerTask('travis', ['qunit']);
};