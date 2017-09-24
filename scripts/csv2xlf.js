let fs = require('fs');
let csv = require('fast-csv');
let cheerio = require('cheerio');

let LANG_ORDER = ['de', 'en', 'fr', 'it'];

let out = [];
let docs = {};

LANG_ORDER.forEach(e => {
    docs[e] = cheerio.load(fs.readFileSync(`src/i18n/messages.${e}.xlf`), {
        xmlMode: true,
        decodeEntities: false
    });
});

csv.fromPath('messages.csv', {
    delimiter: ','
}).on('data', (e) => {
    let obj = { id: e[1] };

    LANG_ORDER.forEach((k, i) => {
        obj[k] = e[2 + i]
    });

    out.push(obj);
}).on('finish', () => {
    parse();
});

function parse() {
    console.log(out);
    out.forEach(e => {
        LANG_ORDER.forEach(k => {
            let target = docs[k](`trans-unit[id=${e.id}]`).find('target');

            if (target) {
                target.html(e[k]);
            } else {
                docs[k](`trans-unit[id=${e.id}]`).append(`<target>${e[k]}</target>`);
            }
        });
    });

    LANG_ORDER.forEach(e => {
        fs.writeFileSync(`src/i18n/messages.${e}.xlf`, docs[e].html());
    });

    console.log('XFL generated!');
}