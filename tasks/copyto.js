'use strict';

module.exports = function copyto(grunt) {

    // Load task
    grunt.loadNpmTasks('grunt-copy-to');

    // Options
    return {
        build: {
            files: [
                {
                    cwd: '.',
                    dot: true,
                    dest: '.build/',
                    src: [
                        'doc/**',
                        'config/**',
                        'locales/**',
                        'resources/**',
                        'repository/**'
                    ]
                }],
            options: {
                ignore: [
                    'public/templates/**/*'
                ]
            }
        }
    };

};
