import fs from 'fs';

export const loadResource = async (res, key) => {
    const ext = key.split('.').pop();
    
    const allowedExt = ['ico', 'png', 'jpg', 'jpeg', 'pdf', 'xlxs', 'css', 'js', 'webp', 'svg', 'avi', 'docx', 'doc'];

    if (allowedExt.includes(ext)) {
        const path = `assets/${key}`;
        const file = fs.createReadStream(path, { highWaterMark: 1024 });
        file.pipe(res);
    }
}