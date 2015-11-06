module.exports = function(symbol) {
    var link = 'https://finance.google.com/finance/info?client=ig&q=';
    return link + symbol.toUpperCase();
}