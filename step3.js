const fs = require('fs');
const axios = require('axios');

function cat(path, outputFile) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:\n ${err}`);
            process.exit(1);
        }
        if (outputFile) {
            writeToFile(data, outputFile);
        } else {
            console.log(data);
        }
    });
}

async function webCat(url, outputFile) {
    try {
        const response = await axios.get(url);
        if (outputFile) {
            writeToFile(response.data, outputFile);
        } else {
            console.log(response.data);
        }
    } catch (error) {
        console.error(`Error fetching ${url}:\n ${error}`);
        process.exit(1);
    }
}

function writeToFile(data, filename) {
    fs.writeFile(filename, data, 'utf8', (err) => {
        if (err) {
            console.error(`Couldn't write to ${filename}:\n ${err}`);
            process.exit(1);
        }
    });
}

const args = process.argv.slice(2);

if (args[0] === '--out') {
    const outputFile = args[1];
    const source = args[2];

    if (source.startsWith('http://') || source.startsWith('https://')) {
        webCat(source, outputFile);
    } else {
        cat(source, outputFile);
    }
} else {
    const source = args[0];
    if (source.startsWith('http://') || source.startsWith('https://')) {
        webCat(source);
    } else {
        cat(source);
    }
}
