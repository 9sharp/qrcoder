/*jslint node: true */

var path = require('path');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    docco: {
      all: {
        options: {
          output: 'docs'
        },
        src: 'src/qrcoder.js'
      }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'src/qrcoder.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    uglify: {
      all: {
        files: {
          'dist/qrcoder.min.js': 'src/qrcoder.js'
        },
        options: {
          banner: (
            '/*! <%= pkg.name %> v<%= pkg.version %> ' +
            '| (c) <%= grunt.template.today("yyyy") %>' +
            '| MIT License\n' +
            '*/'
          ),
          report: 'min',
          sourceMap: true,
          sourceMapName: 'dist/qrcoder.min.map'
        }
      }
    },
    copy: {
      dist: {
        files: [
          {
            src: 'src/qrcoder.js',
            dest: 'dist/qrcoder.js'
          },
        ]
      }
    },
    express: {
      server: {
        options: {
          port: 8080,
          hostname: '*',
          server: path.resolve('./examples/browser/index')
        },
      }
    },
    watch: {
      all: {
        files: 'examples/*.html',
        options: {
          livereload: true
        }
      }
    },
    open: {
      all: {
        path: 'http://localhost:8080/index.html'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-docco');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('default', [ 'test' ]);
  grunt.registerTask('dist', [ 'test', 'copy:dist', 'uglify', 'docco' ]);
  grunt.registerTask('test', [ 'jshint' ]);
  grunt.registerTask('server', ['express', 'open', 'watch', 'express-keepalive']);
};
