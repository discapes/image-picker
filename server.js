import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { globby } from 'globby';

const require = createRequire(import.meta.url);
const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();


let port = 3000
let rootdir = path.join(__dirname, 'data/');
app.use(cors);



app.get('/pics', async (req, res) => {
    const pics = (await globby([
        'data/pics/*.png',
        'data/pics/*.jpg'
    ]))
        .sort()
        .map(fullpath => path.basename(fullpath));
    res.json(pics);
});

app.get('/move', async (req, res) => {
    if (!req.query.filename || !req.query.olddir || !req.query.newdir) return res.sendStatus(400);
    let oldpath = path.join(rootdir, req.query.olddir, req.query.filename);
    let newpath = path.join(rootdir, req.query.newdir, req.query.filename);
    if (oldpath.indexOf(rootdir) !== 0 || newpath.indexOf(rootdir) !== 0) return res.sendStatus(404);
    console.log(`Renaming ${oldpath} to ${newpath}`);

    try {
        await fs.rename(oldpath, newpath);
        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        return res.sendStatus(404);
    }
});

app.get('/get', async (req, res) => {
    let filename = req.query.filename;
    if (!filename) return res.sendStatus(404);
    let filepath = path.join(rootdir, 'pics', filename);
    if (filepath.indexOf(rootdir) !== 0) throw new Error("Invalid filename");
    res.sendFile(filepath);
});



app.listen(port, () => console.log(`Server listening on port ${port}`))

function cors(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Expose-Headers', '*');
    next();
}