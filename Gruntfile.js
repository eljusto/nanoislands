/*global module*/
module.exports = function(grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks("grunt-jscs-checker");
    grunt.loadNpmTasks('grunt-mocha-phantomjs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');

    var gruntConfig = {};

    gruntConfig.jshint = {
        options: {
            jshintrc: '.jshintrc'
        },
        files: [
            'blocks/*/*.js'
        ]
    };

    gruntConfig.jscs = {
        src: "blocks/*/*.js",
        options: {
            config: ".jscs.json",
            requireCurlyBraces: [ "if" ]
        }
    };

    gruntConfig.shell = {
        rebuildNanoislands: {
            command: "make",
            options: {
                stdout: true,
                failOnError: true
            }
        },

        rebuildTests: {
            command: "make unittests/tests.yate.js",
            options: {
                stdout: true,
                failOnError: true
            }
        }
    };

    gruntConfig.watch = {
        build: {
            files: [
                "<%= jshint.files %>",
                "blocks/*/*.yate",
                "demo/*.yate"
            ],
            tasks: [
                "shell:rebuildNanoislands"
            ],
            options: {
                // Start a live reload server on the default port 35729
                livereload: true
            }
        },
        testYate: {
            files: [
                "unittests/spec/*/*.yate"
            ],
            tasks: [
                "shell:rebuildTests",
                "mocha_phantomjs:all"
            ]
        },
        testJs: {
            files: [
                "unittests/spec/*/*.js"
            ],
            tasks: [
                "mocha_phantomjs:all"
            ]
        }
    };

    gruntConfig.mocha_phantomjs = {
        all: ['unittests/index.html']
    };

    grunt.initConfig(gruntConfig);

    grunt.registerTask('default', ['jshint', 'jscs', 'mocha_phantomjs']);
    grunt.registerTask('watch_make', ['shell', 'watch']);
};
