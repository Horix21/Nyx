const { time } = require("console");
const fs = require("fs");
const cfg = require('home-config').load('.myapprc')

var os = require('os')

const roamingDir = `C:/Users/${os.userInfo().username}/AppData/Roaming/NyxData`;

var folderExists = false;

var logging = false;

function createFolder(dir) {
    try {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir,
                {
                    recursive: true
                });
        }
    }
    catch (ex) {
        console.log(`There was an error creating a folder in ${dir} \n ${ex}`);
    }
}

function createFile(dir, name, extension, data) {
    try {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir,
                {
                    recursive: true
                });

            fs.writeFileSync(`${dir}/${name}.${extension}`, data);
        }
        else if (fs.existsSync(dir)) {
            fs.writeFileSync(`${dir}/${name}.${extension}`, data);
        }
    }
    catch (ex) {
        console.log(`There was an error creating ${name}.${extension} in ${dir} \n ${ex}`);
    }
}

function createConfigFile(name, extension, data) {
    try {
        if (process.platform === "linux") {
            const home = process.env.HOME;
            var linuxRoaming = `${home}/.NyxApp`;
            fs.mkdirSync(linuxRoaming,
                {
                    recursive: true
                });
            fs.writeFileSync(`${linuxRoaming}/${name}${extension}`, data);
        }

        if (process.platform === "win32") {
            if (!fs.existsSync(roamingDir)) {
                fs.mkdirSync(roamingDir,
                    {
                        recursive: true
                    });

                fs.writeFileSync(`${roamingDir}/${name}${extension}`, data);
            }
            else if (fs.existsSync(roamingDir)) {
                fs.writeFileSync(`${roamingDir}/${name}${extension}`, data);
            }
        }
    }
    catch (ex) {
        if (process.platform === "win32") {
            console.log(`There was an error creating a config file ${name}${extension} in ${roamingDir} \n ${ex}`);
        }
        if (process.platform === "linux") {
            console.log(`There was an error creating a config file ${name}${extension} in ${linuxRoaming} \n ${ex}`);
        }
    }
    //console.log(process.env.HOME)
}

function logError(error) {
    try {
        var date = new Date().toISOString().slice(0, 10);
        if (logging = true) {
            if (!fs.existsSync(roamingDir)) {
                fs.mkdirSync(roamingDir,
                    {
                        recursive: true
                    });
            }
            fs.writeFileSync(`${roamingDir}/error.log`, `${date} ` + `Error: ${error}`);
        }
    }
    catch (ex) {

    }
}

function checkFolderExists(dir) {
    if (fs.existsSync(dir)) {
        folderExists = true;
    }
    if (!fs.existsSync(dir)) {
        folderExists = false;
    }
}

module.exports =
{
    createFolder,
    createFile,
    createConfigFile,
    logError,
    checkFolderExists,
    folderExists,
    roamingDir,
    logging
}