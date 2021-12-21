const AWS = require('aws-sdk');

// AWS SECRET KEY AND ACCESS KEY ID
const ID = 'AKIATOCREIBSQKW4OJSN';
const SECRET = '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';

// The name of the bucket that you have created
const BUCKET_NAME = 'scoutsbagawsbucket123';

//create new s3 interface
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const params = {
    Bucket: BUCKET_NAME,
    CreateBucketConfiguration: {
        LocationConstraint: "eu-west-2"
    }
};

s3.createBucket(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else console.log('Bucket Created Successfully', data.Location);
});