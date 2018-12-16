module.exports = function () {
    return {
        files: [
            'app/**/*.js'
        ],

        tests: [
            'test/**/*test.js'
        ],

        env: {
            type: 'node',
            runner: 'node'
        }
    };
};