module.exports = function(input) {
    var symbols = input.split(' ');
    var filtered = symbols.map(x => x.match(/[a-zA-Z]/g));  
    return filtered.map(x => x == null || x.length > 6 
        ? '' : x.join(''));
}