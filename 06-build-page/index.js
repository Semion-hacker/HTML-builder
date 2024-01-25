const fsP = require('fs').promises;
const fs = require('fs');
const path = require('path');
const projectDistFolder = path.resolve(__dirname, "project-dist");
const componentsFolder = path.resolve(__dirname, "components");
const templateHtml = path.resolve(__dirname, "template.html");
const indexHtml = path.join(__dirname, 'project-dist', 'index.html');
let result = '';
fs.mkdir(
    projectDistFolder,
    { recursive: true },
    (error) => {
        if (error) {
            return console.log(error);
        };
    }
);
const fileStyles = path.resolve(__dirname, "styles");
const creationFileStyles = fs.createWriteStream(path.join(__dirname, "project-dist", "style.css"), 'utf-8');
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
                    readFileStyles.pipe(creationFileStyles);
                }
            }
        )
    }
);
fs.readFile(templateHtml, 'utf-8', (error, data) => {
        if (error) {
            return console.log(error);
        };
        result += data;
        fs.readdir(componentsFolder, { withFileTypes: true }, (error, files) => {
                if (error) {
                    return console.log(error);
                };
                let componentsFolderTarget = files.filter((file) => file.isFile() && path.extname(file.name) === '.html');
                if (componentsFolderTarget.length !== 0) {
                    componentsFolderTarget.forEach((file) => {
                            const componentsFolderFileName = path.join(componentsFolder, file.name);
                            fs.readFile(componentsFolderFileName, 'utf-8', (error, data) => {
                                    if (error) {
                                        return console.log(error);
                                    };
                                    let example = path.parse(file.name).name;
                                    let exemplar = `{{${example}}}`;
                                    result = result.replaceAll(exemplar, data);
                                    fs.writeFile(indexHtml, result, (error) => {
                                            if (error) {
                                                return console.log(error);
                                            };
                                        }
                                    )
                                }
                            )
                        }
                    )
                }
            }
        )
    }
);
const assets = path.join(__dirname, 'assets');
const assetsCopy = path.join(projectDistFolder, 'assets');
async function copyFiles(assets, assetsCopy) {
    await fs.promises.rm(
        assetsCopy,
        { recursive: true, force: true },
        (error) => {
            if (error) {
                return console.log(error);
            };
        }
    );
    fs.mkdir(
        assetsCopy,
        { recursive: true },
        (error) => {
            if (error) {
                return console.log(error);
            };
        }
    );
    fs.readdir(
        assets,
        { withFileTypes: true },
        (error, aboutFiles) => {
            if (error) {
                return console.log(error);
            };
            aboutFiles.forEach(
                (aboutFile) => {
                    const assetsCopyAboutFile = path.join(assetsCopy, aboutFile.name);
                    const assetsAboutFile = path.join(assets, aboutFile.name);
                    if (aboutFile.isFile()) {
                        fs.copyFile(
                            assetsAboutFile,
                            assetsCopyAboutFile,
                            (error) => {
                                if (error) {
                                    return console.log(error);
                                };
                            }
                        )
                    } else if (aboutFile.isDirectory()) {
                        fs.mkdir(
                            assetsCopyAboutFile,
                            { recursive: true },
                            (error) => {
                                if (error) {
                                    return console.log(error);
                                };
                            }
                        )
                        copyFiles(assetsAboutFile, assetsCopyAboutFile);
                    }
                }
            )
        }
    );
}
copyFiles(assets, assetsCopy);