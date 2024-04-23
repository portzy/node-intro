const fs = require('fs');

function cat(path){
    fs.readFile(path, 'utf8', (err, data) => {
        if (err){
            console.error(`Error reading ${path}:\n ${err}`);
            process.exit(1); //exit if error
        }
        console.log(data); //print data if no error
    } )
}

const filePath = process.argv[2]; // get the command line argument for the file path
cat(filePath); // call the cat function with the provided file path
