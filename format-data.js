module.exports = function(data) {
    var trimmed = data.slice(6, data.length - 2);
    return JSON.parse(trimmed);
}