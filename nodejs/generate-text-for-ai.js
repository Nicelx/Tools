const fs = require('fs').promises;
const path = require('path');

const generate = async () => {
    let fullContent = '';

    // add root for project
    const root = path.join(__dirname, '..');

    // defining paths of files, that we want to combine to text
    const paths = [
        'index.js',
        'config/db.js',
        'controllers/userController.js',
        'models/User.js'
    ];

    paths.forEach((item, index) => {
        paths[index] = path.join(root, item);
    })
    for (const p of paths) {
        const content = await fs.readFile(p, 'utf-8');
        fullContent += '\n********************* \n';
        fullContent += p;
        fullContent += '\n\n';
        fullContent += content;
    }

    // path for result output
    await fs.writeFile('utils/result.txt', fullContent);
}