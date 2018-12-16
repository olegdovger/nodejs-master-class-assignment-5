module.exports = {
    sum(a, b) {
        return a + b;
    },
    domainName(url) {
        return url.match(/((?:https*:\/\/){0,}(?:www\.){0,})([^\.]+)\./)[2];
    }
};