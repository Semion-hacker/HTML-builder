const fs = require('fs');
const path = require('path');
const resultReadStream = fs.createReadStream(path.resolve(__dirname, 'text.txt'), 'utf-8');
resultReadStream.on('data', (chank) => console.log(chank));