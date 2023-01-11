const AWS = require('aws-sdk');

const ID = '';
const SECRET = '';

// The name of the bucket that you have created
const BUCKET_NAME = 'test-bucket';

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const params = {
    Bucket: BUCKET_NAME,
    CreateBucketConfiguration: {
        // Set your region here
        LocationConstraint: "eu-west-1"
    }
};
const S3CreateBucket = () =>{
    s3.createBucket(params, function(err, data) {
        if (err) console.log(err, err.stack);
        else console.log('Bucket Created Successfully', data.Location);
    });
}
const S3Insert = async (fileName, fileContent) => {
    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName, // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        // console.log(`File uploaded successfully. ${data.Location}`);
    });

}

const S3Update = async () =>{

}

const S3Delete = async (params) =>{
    s3.deleteObject(params,(err, data) => {
        if (err){
            throw err;
        }
        else{

        }

    })
}

const S3RetrieveItem = async (params) => {
    s3.getObject(params, (err, data) => {
        if (err){
            throw err;
        }
        else{
            return data;
        }
    })
}

const S3RetrieveAll = async (params) => {
    s3.listObjects(params, (err, data)=>{
        if (err){
            throw err;
        }
        else{
            return data;
        }
    });
}

module.exports = {
    S3CreateBucket, S3Delete, S3Update, S3Insert, S3RetrieveItem, S3RetrieveAll
}