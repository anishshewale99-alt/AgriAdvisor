const bcrypt = require('bcryptjs');
console.log('Bcryptjs loaded');
const hash = bcrypt.hashSync('test', 10);
console.log('Hash:', hash);
console.log('Success');
