const AWS = require('aws-sdk');
const config = require('./config');

const ID = config.S3_ACCESS_KEY;
const SECRET = config.S3_SECRET_ACCESS_KEY;
const BUCKETNAME = config.BUCKETNAME;

// The name of the bucket that you have created


const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});


const S3CreateBucket = () =>{
    const param = {
        Bucket: BUCKETNAME,  /* required */                /* required */       
      };
    s3.createBucket(param, function(err, data) {
        if (err) console.log(err, err.stack);
        else console.log('Bucket Created Successfully', data.Location);
    });
}
const S3Insert = async (username, id, fileContent) => {
    // Setting up S3 upload parameters
    const param = {
        Bucket: BUCKETNAME,
        Key: username+'/'+id, // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(param, function(err, data) {
        if (err) {
            throw err;
        }
        // console.log(`File uploaded successfully. ${data.Location}`);
    });

}


const S3Delete = async (username, id) =>{
    const param = {
        Bucket: BUCKETNAME,
        Key: username+'/'+id, // File name you want to save as in S3
    };

    s3.deleteObject( param, (err, data) => {
        if (err){
            throw err;
        }
        else{

        }
    })
}

const S3RetrieveItem = async (username, id) => {
    const param = {
        Bucket: BUCKETNAME,
        Key: username+'/'+id, // File name you want to save as in S3
    };
    try {
    const result = await s3.getObject(param).promise();
    return result;
    } catch (err) {
        throw err;
      }
}

const S3RetrieveAll = async (username, id) => {
    const param = {
        Bucket: BUCKETNAME,
        Key: username+'/'+id, // File name you want to save as in S3
    };
    s3.listObjects(param, (err, data)=>{
        if (err){
            throw err;
        }
        else{
            return data;
        }
    });
}

module.exports = {
    S3CreateBucket, S3Delete, S3Insert, S3RetrieveItem, S3RetrieveAll
}