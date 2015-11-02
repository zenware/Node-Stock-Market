module.exports = function(input) {
    var symbols = input.split(' ');
    var filtered = symbols.map(x => x.match(/[a-zA-Z]/g));  
    var stocks = filtered.map(x => x == null || x.length > 5 
        ? '' : x.join(''));
    return stocks;
}