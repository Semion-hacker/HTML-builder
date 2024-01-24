const fsP = require('fs').promises;
const fs = require('fs');
const path = require('path');
const fileStyles = path.resolve(__dirname, "styles");
const creationFileBundle = fs.createWriteStream(path.join(__dirname, "project-dist", "bundle.css"), 'utf-8');
const fsPReaddirFileStyles = fsP.readdir(
    fileStyles,
    { withFileTypes: true },
    (error) => {
        if (error) {
            return console.log(error);
        };
    }
);
fsPReaddirFileStyles.then(
    (aboutFiles) => {
        aboutFiles.forEach(
            (aboutFile) => {
                if (path.extname(aboutFile.name) === '.css') {
                    const readFileStyles = fs.createReadStream(path.join(aboutFile.path, aboutFile.name));
                    readFileStyles.pipe(creationFileBundle);
                }
            }
        )
    }
);