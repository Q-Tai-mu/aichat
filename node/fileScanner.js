const fs = require('fs');
const path = require('path');
module.exports = {
    var:error = this .scanDirectory,
    scanDirectory: function (directoryPath) {
        fs.readdir(directoryPath, {withFileTypes: true}, (err, files) => {
            if (err) {
                console.log('Error:', err);
            } else {
                files.forEach((file) => {
                    const filePath = path.join(directoryPath, file.name);
                    if (file.isDirectory()) {
                        console.log('Directory:', filePath);
                        console.log('Directory: scanDirectory2', scanDirectory2);
                        error(filePath);
                    } else {
                        console.log('File:', file.name, 'Directory:', directoryPath);
                    }
                });
            }
        });
    }.bind(this)
}