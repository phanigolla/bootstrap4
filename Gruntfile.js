'use strict';

module.exports = function (grunt) {
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt,{
        useminPrepare : 'grunt-usemin'
    });

    // Define the configuration for all the tasks
    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'css/styles.css': 'css/styles.scss'
                }
            }
        },
        watch: {
            files: 'css/*.scss',
            tasks: ['sass']
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'css/.*css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: './'
                    }

                }
            }
        },
        copy : {
            html : {
                files : [{
                        expand : true,
                        dot : true,
                        cwd : './',
                        src : ['*.html'],
                        dest : 'dist'
                }]
            },
            fonts : {
                files : [{
                    expand : true,
                    dot : true,
                    cwd : 'node_modules/font-awesome',
                    src : ['fonts/*.*'],
                    dest :'dist'
                }]
            }
        },
        clean : {
            build : {
                src : ['dist/']
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: './',                   // Src matches are relative to this path
                    src: ['img/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'dist/'                  // Destination path prefix
                }]
            }
        },
        useminPrepare : {
            foo : {
                dest : 'dist',
                src : ['contactus.html','aboutus.html','index.html']
            },
            options : {
                flow : {
                    steps : {
                        css : ['cssmin',],
                        js : ['uglify']
                    },
                    post : {
                        css : [{
                            name : 'cssmin',
                            createConfig : function(context,block){
                                var generated = context.options.generated;
                                generated.options={
                                    keepSpecialComments : 0, rebase : false
                                };
                            }
                        }]
                    }
                }
            }
        },
        concat : {
            options : {
                seperator : ';'
            },
            dist : {}
        },
        uglify :{
            dist : {}
        },
        cssmin :{
            dist : {

            }
        },
        filerev : {
            options : {
                encoding : 'utf8',
                algorithm : 'md5',
                length : 20
            },
            release : {
                files : [{
                    src : [
                        'dist/js/*.js',
                        'dist/css/*.css'
                    ]
                }]
            }
        },
        usemin :{
            html : ['dist/contactus.html','dist/aboutus.html','dist/index.html'],
            options : {
                assertDirs : ['dist','dist/css','dist/js']
            }
        },
        htmlmin :{
            dist : {
                options : {
                    collapseWhiteSpace : true
                },
                files : {
                    'dist/index.html' : 'dist/index.html',
                    'dist/aboutus.html' : 'dist/aboutus.html',
                    'dist/contactus.html' : 'dist/contactus.html'
                }
            }
        }
    });

    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('build',[
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);
};