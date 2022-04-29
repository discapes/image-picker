import { createRequire } from "module";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);
import {globby} from 'globby';
const express = require('express');

const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Expose-Headers', '*');
    next();
});

const paths = await globby(["pics/*.png", "pics/*.jpg"]);  

app.get('/:index', async (req, res) => {
    let index = Math.max(0, req.params.index);
    index = Math.min(paths.length - 1, index);
    let fname = paths[index];
    res.set('index', index);
    res.sendFile(fname, { root: __dirname });
});

app.listen(port, () => console.log(`Server listening on port ${port}`))

