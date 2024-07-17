import express from 'express';
import dotenv from 'dotenv';
import { loadResource } from './helpers/AWSS3.js';

dotenv.config();
const app = express();

app.use(express.json());

app.get('/resource/:key', async (req, res) => {
    const key = req.params.key;
    await loadResource(res, key);
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})