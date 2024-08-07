import AWS from 'aws-sdk';
AWS.config.update({
    accessKeyId: dotenv.S3_SECRET_ID,
    secretAccessKey: dotenv.S3_SECRET_KEY,
});

export const loadResource = async (res, key) => {
    try {
        var s3 = new AWS.S3();
        
        if (key.split('.').length <= 1) {
            res.status(200).send({status: "error", errorCode: "400"})
        }
        
        let resourceExt = key.split('.')[ key.split('.').length - 1 ];
    
        let fileTypes = ['jpg', 'jpeg', 'png'];
        
        
        if (!fileTypes.includes(resourceExt)) {
            res.status(200).send({status: "error", errorCode: "400"})
        }
        
        await new Promise((resolve) => {
            const readableObject = s3.getObject({ Bucket: "REPLACE_BUCKET", Key: key }).createReadStream();
            readableObject.pipe(res)
            readableObject.on('end', resolve);
        })
    }
    catch (e) {
        console.error(e)
        res.send({status: 'error', code: "404"})
    }
}