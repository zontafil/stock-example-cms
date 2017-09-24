let fs = require('fs');
let csv = require('fast-csv');
let cheerio = require('cheerio');

let LANG_DEFS = {
    it: 'Italiano',
    en: 'English',
    de: 'Deutsche',
    fr: 'Français'
};

// Get current languages
let lang = fs.readdirSync('src/i18n/').map(e => {
    let m = e.match(/^messages\.(.{2})\.xlf$/i);
    if (m) return m[1]
}).filter(e => !!e);

// Get units
let doc = cheerio.load(fs.readFileSync('src/i18n/messages.xlf'), {
    xmlMode: true,
    decodeEntities: false
});

let units = doc('trans-unit').toArray().map(e => {
    return {
        source: doc(e).find('source').html(),
        id: doc(e).attr('id')
    };
});

let docs = {};

lang.forEach(e => {
    docs[e] = cheerio.load(fs.readFileSync(`src/i18n/messages.${e}.xlf`), {
        xmlMode: true,
        decodeEntities: false
    });
});

let out = units.map(e => {
    lang.forEach(k => {
        let target = docs[k](`trans-unit[id=${e.id}]`).find('target').html()
        e[`target_${k}`] = target;
    });

    return e;
});

csv.writeToPath('messages.csv', out, {
    delimiter: ';',
    headers: true,
    transform: (e) => {
        let o = { Sorgente: e.source, ID: e.id };
        lang.forEach(k => o[LANG_DEFS[k]] = e[`target_${k}`]);

        return o;
    }
}).on('finish', () => {
    console.log('CSV generated');
})