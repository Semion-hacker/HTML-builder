const fs = require('fs');
const path = require('path');
const resultSecretFolder = path.resolve(__dirname, 'secret-folder');
fs.readdir(
    resultSecretFolder,
    { withFileTypes: true },
    (error, aboutFiles) => {
        if (error) {
            console.log(error);
        };
        aboutFiles.forEach((aboutFile) => {
            if (aboutFile.isFile()) {
                const pathF = path.join(resultSecretFolder, aboutFile.name);
                const Dot = path.parse(pathF).ext.slice(1);
                const Name = aboutFile.name;
                fs.stat(pathF, (error, scale) => {
                    if (error) {
                        console.log(error);
                    };
                    console.log(`${Name} - ${Dot} - ${scale.size}b`)
                });
            };
        });
    },
);