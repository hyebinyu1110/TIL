/*
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync'); // 어떤 방식으로 데이터를 저장할 것인가라는 것에 따라 우리가 가져와야할 모듈이 달라진다.  파일의 동기방식으로 저장하겠다라는 의미
const adapter = new FileSync('db.json');// 우리 데이터를 db.json이라고 하는 파일의 JSON의 형식에 따라 저장하겠다라는 의미 
const db = low(adapter); // lowdb에게 adapter라고 하는 db.json파일에다가 동기방식으로 저장하겠다라고 이렇게 지정해줌.    db라는 변수를 통해 lowdb를 제어할 수 있게된다. 
// 어떤 방식으로 데이터를 저장할 것인가라는 것에 따라 우리가 가져와야할 모듈이 달라진다.  파일의 동기방식으로 저장하겠다라는 의미
*/

import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

// Read data from JSON file, this will set db.data content
await db.read()

// If file.json doesn't exist, db.data will be null
// Set default data
// db.data = db.data || { posts: [] } // Node < v15.x
db.data ||= { topic: [], author: [] }             // Node >= 15.x

// Finally write db.data content to file


db.data.author.push({
    id:1,
    name: 'egoing',
    profile: 'developer'
});
db.data.topic.push({
    id:1,
    title: 'lowdb',
    description: 'lowdb is..',
    author: 1
});
db.data.topic.push({
    id:2,
    title: 'mysql',
    description: 'mysql is..',
    author: 1
});

await db.write()