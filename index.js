import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import { loadResource } from './helpers/media.js';
import loadWebsite from './helpers/loadWebsite.js';
import { loadCMS } from './helpers/loadCMS.js';
import * as blocks from './helpers/endpoints/blocks.js';
import * as navigation from './helpers/endpoints/navigation.js';
import * as images from './helpers/endpoints/images.js';
import * as files from './helpers/endpoints/files.js';

const upload = multer({ dest: 'assests/' });

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/assets/:folder?/:key', async (req, res) => {
    const key = req.params.key;
    const folder = req.params.folder ? req.params.folder + "/" : "";
    await loadResource(res, folder + key);
})

app.get('/', async (req, res) => {
    res.send(await loadWebsite());
})

app.get('/wp/:page?', async (req, res) => {
    res.send(await loadCMS(req.params.page || "blocks"));
})

app.get('/wp/api/block', async (req, res) => {
    res.send(await blocks.getOptions(req.query));
})

app.post('/wp/api/block', async (req, res) => {
    res.send(await blocks.create(req.body));
})

app.put('/wp/api/block', async (req, res) => {
    res.send(await blocks.update(req.body));
})

app.delete('/wp/api/block', async (req, res) => {
    res.send(await blocks.remove(req.query.id));
})

app.post('/wp/api/navigation', async (req, res) => {
    res.send(await navigation.create(req.body));
})

app.put('/wp/api/navigation', async (req, res) => {
    res.send(await navigation.update(req.body));
})

app.delete('/wp/api/navigation', async (req, res) => {
    res.send(await navigation.remove(req.query.id));
})

app.get('/wp/api/image', async (req, res) => {
    res.send(await images.getGallery(req.query));
})

app.post('/wp/api/image', upload.single("file"),async (req, res) => {
    res.send(await images.create(req.body, req.file));
})

app.put('/wp/api/image', async (req, res) => {
    res.send(await images.update(req.body));
})

app.delete('/wp/api/image', async (req, res) => {
    res.send(await images.remove(req.query.id));
})

app.post('/wp/api/file', upload.single('file'), async (req, res) => {
    res.send(await files.create(req.body, req.file));
})

app.put('/wp/api/file', async (req, res) => {
    res.send(await files.update(req.body));
})

app.delete('/wp/api/file', async (req, res) => {
    res.send(await files.remove(req.query.id));
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})