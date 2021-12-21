require('dotenv/config')

const express = require('express')
const multer = require('multer')
const app = express()
const port = 60000
const AWS = require('aws-sdk')

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
})

const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
})

const upload = multer({storage}).single('image')


app.post("/upload", upload, (req, res) => {

    console.log("IN")

    let myImage = req.file.originalname.split(".")
    const fileType = myImage[myImage.length - 1]

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.file.originalname,
        Body: req.file.buffer 
    }

    s3.upload(params, (error, data) => {
        if(error){
            res.status(500).send(error)
        }

        res.status(200).send(data)
    })
})


app.listen(port, () => {
    console.log("Server is up at " + port)
})
