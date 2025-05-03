const path = require('node:path');
const fs = require('node:fs/promises');

const filePath = path.join(process.cwd(), 'db', 'users.json');

const read = async () => {
    try {
    const users = await fs.readFile(filePath, {encoding: 'utf-8'});
        return users ? JSON.parse(users) : [];
    } catch (e) {
        console.log('Error', e.message);
    }
};

const write = async (users) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(users, null, 2));
    } catch (e) {
        console.log('Error', e.message);
    }
};

module.exports = {
    read,
    write
}