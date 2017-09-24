let csv = require('fast-csv');
let out = [];

csv.fromPath('messages.csv', {
    delimiter: ';'
}).on('data', e => out.push(e)).on('finish', () => {
    csv.writeToPath('messages.csv', out, {
        delimiter: ','
    });
});