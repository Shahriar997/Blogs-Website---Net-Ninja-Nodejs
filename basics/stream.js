const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', { encoding: 'utf8' });
const writeStream = fs.createWriteStream('./docs/blog4.txt');

// readStream.on('data', (chunk) => {
//     console.log('========================nre chunk ============================');
//     console.log(chunk);
//     writeStream.write('\n new chunk \n');
//     writeStream.write(chunk);
// });

readStream.pipe(writeStream);
