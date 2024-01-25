const fsP = require('fs').promises;
const fs = require('fs');
const path = require('path');
const originalFile = path.resolve(__dirname, "files")
const copyOfTheFile = path.resolve(__dirname, "files-copy")
async function  copyDir() {
    await fs.promises.rm(
        copyOfTheFile,
        { recursive: true, force: true },
        (error) => {
            if (error) {
                return console.log(error);
            };
        }
    );
    fs.mkdir(
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