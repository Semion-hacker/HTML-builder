const fsP = require('fs').promises;
const path = require('path');
const originalFile = path.resolve(__dirname, "files")
const copyOfTheFile = path.resolve(__dirname, "files-copy")
const copyDir = () => {
    fsP.mkdir(
        copyOfTheFile,
        { recursive: true },
        (error) => {
            if (error) {
                return console.log(error);
            };
        }
    );
    const fsPReaddir = fsP.readdir(
        originalFile,
        { withFileTypes: true },
        (error) => {
            if (error) {
                return console.log(error);
            };
        }
    );
    fsPReaddir.then(
        (aboutFiles) => {
            aboutFiles.forEach(
                (aboutFile) => {
                    const aboutFileOriginalFile = path.resolve(originalFile, aboutFile.name)
                    const aboutFileCopyOfTheFile = path.resolve(copyOfTheFile, aboutFile.name)
                    fsP.copyFile(
                        aboutFileOriginalFile,
                        aboutFileCopyOfTheFile
                    )
                }
            )
        }
    );
};
copyDir();