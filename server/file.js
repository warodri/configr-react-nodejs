const fs = require('fs');
const csv = require('csvtojson');

/**
 * Saves CSV file and saves converted JSON file
 */
async function saveFile( name ) {
    try {
        const csvFilePath = process.cwd() + '/public' + name;
        const jsonFilePath = process.cwd() + '/public' + name + '.json';

        // Convert from CSV to JSON
        const jsonContent = await csv().fromFile( csvFilePath );
    
        // Store JSON file
        fs.writeFileSync( jsonFilePath, JSON.stringify( jsonContent ) );

        // Return to client
        return {
            success: true,
            content: jsonContent,
            message: 'This is your file converted'
        }

    } catch(err) {
        // Return error to client
        return {
            success: false,
            content: {},
            message: 'Error converting this file. Please check its format and try again.'
        }
    }

}

exports.saveFile = saveFile;
