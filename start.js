require('babel-register')({
    presets: [ 'env' ]
})

Array.prototype.shuffle = function() {
    function _compareRandom(a, b) {
        return Math.random() - 0.5;
    }

    this.sort(_compareRandom);
    return this;
};

module.exports = require('./server.js')