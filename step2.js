const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:\n ${err}`);
            process.exit(1); // exit if error
        }
        console.log(data); // print data if no error
    });
}

async function webCat(url) {
    try {
        const response = await axios.get(url);
        console.log(response.data); // print the HTML or data fetched from the url
    } catch (error) {
        console.error(`Error fetching ${url}:\n ${error}`);
        process.exit(1);
    }
}

const arg = process.argv[2];
if (arg.startsWith('http://') || arg.startsWith('https://')) {
    webCat(arg);
} else {
    cat(arg);
}
