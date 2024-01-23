const fs = require('fs');
const readline = require('readline').createInterface({ input: process.stdin });
const path = require('path');
const resultWriteStream = fs.createWriteStream(path.resolve(__dirname, 'some.txt'), 'utf-8');
process.stdout.write('Привет напиши сюда что-то\n');
const exitProcess = () => {
    process.stdout.write('Ну пока)');
    process.exit();
}
readline.on('line', (message) => {
    if (message === 'exit') {
        exitProcess();
    };
    resultWriteStream.write(`${message}\n`);
});
process.on('SIGINT', exitProcess);