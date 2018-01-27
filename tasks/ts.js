'use strict';

module.exports = function ts(grunt) {

    // Load task
    grunt.loadNpmTasks('grunt-ts');

    // Options
    return {
        build: {
            tsconfig: true
        }
    };

};
