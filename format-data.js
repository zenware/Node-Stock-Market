function parseKey(key) {
    var chars = key.split('');
    var filtered = chars.map(x => x.match(/[a-zA-Z]/g));
    return filtered.map(x => x == null ? '' : x).join('');
}

function parseValue(value) {
    var chars = value.split('"');
    return chars.join('');
}

function parsePair(data) {
    var separated = data.split(':');
    var parsedKey = parseKey(separated[0]);
    var parsedValue = parseValue(separated[1]);
    return {
        key: parsedKey,
        value : parsedValue
    };
}

module.exports = function(data) {
    var dataPairs = data.split(',');
    var output = [];
    for (var i = 0; i < dataPairs.length; ++i) {
        var parsed = parsePair(dataPairs[i]);
        output.push(parsed);
    }
    return output;
}