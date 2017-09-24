let express = require('express');
let path = require('path');
let http = require('http');

let app = express();
let argv = require('minimist')(process.argv.slice(2));
let port = process.env.PORT || argv.port || 8092;

app.use(express.static(path.join(__dirname, './dist')));

app.get('*', (req, res) => {
    let lang = req.get('Accept-Language');

    if (lang.indexOf('it') > -1) return res.redirect('/it/index.html');
    if (lang.indexOf('de') > -1) return res.redirect('/de/index.html');

    res.redirect('/en/index.html');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});