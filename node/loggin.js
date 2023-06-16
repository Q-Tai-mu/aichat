// logging.js
const fs = require('fs');
module.exports = {
    writeToLog: function (message,path) {
        const date = new Date();
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
            separator: ':'
        };
        const formattedDate = date.toLocaleString('en-US', options)
            .replace(',', '')
            .replace(' ', ':');
        console.log();
        message = `Formatted date: [ ${formattedDate}]` + message;
        fs.appendFile(path, message + '\n', (err) => {
            if (err) throw err;

        });
    }
}