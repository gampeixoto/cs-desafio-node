/* jshint node:true */

module.exports = function (grunt) {
    
    grunt.initConfig({
        min: {
            dist: {
                src: ['./server.js'],
                dest: './all.min.js'
            }
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                
                "globals": {
                    "spyOn": false,
                    "it": false,
                    "console": false,
                    "require": false,
                    "describe": false,
                    "expect": false,
                    "beforeEach": false,
                    "waits": false,
                    "waitsFor": false,
                    "runs": false,
                    "module":false,
                    "process":false
                },
            
                "node" : false,
                "esversion":6,
                "browser" : true,
            
                "boss" : false,
                "curly": false,
                "debug": false,
                "devel": false,
                "eqeqeq": true,
                "evil": true,
                "forin": false,
                "immed": true,
                "laxbreak": false,
                "newcap": true,
                "noarg": true,
                "noempty": false,
                "nonew": false,
                "nomen": false,
                "onevar": true,
                "plusplus": false,
                "regexp": false,
                "undef": true,
                "sub": true,
                "strict": false,
                "white": true,
                "unused": true
            },
            target:['*.js', 'config/*.js', 'config/**/*.js', 'app/**/*.js', 'test/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint']);
};