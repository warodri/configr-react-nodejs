const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors')
const app = express();

// Common config values
const config = require('./config');

// Controller to process the uploaded file
const file = require('./file');

// middle ware
app.use(express.static('public')); //to access the files in public folder
app.use(cors()); // it enables all cors requests
app.use(fileUpload());

// file upload api
app.post('/upload', (req, res) => {

    // Respond HTTP 500 if no file is given
    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }

    // accessing the file
    const myFile = req.files.file;

    //  mv() method places the file inside public directory
    myFile.mv(`${ __dirname }/${ config.global.publicFolder }/${ myFile.name }`, async (err) => {

        // Respond HTTP 500 if errors
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }

        // Get file name and path
        const fileName = myFile.name;
        const filePath = `/${myFile.name}`;

        // run the process...
        const result = await file.saveFile(filePath);
        
        return res.status(200).json({
            name: fileName,
            path: filePath
        })

    });
})


app.listen(config.global.port, () => {
    console.log('server is running at port ' + config.global.port);
})

