import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import lodash from 'lodash'
import { nanoid } from 'nanoid'


var  __dirname = dirname(fileURLToPath(import.meta.url));

var file = join(__dirname, 'db.json')
var adapter = new JSONFile(file)
var db = new Low(adapter)


await db.read()

db.data ||= { topic: [], author: [] }            

// db.data.author.push({
//     id:1,
//     name: 'egoing',
//     profile: 'developer'
// });
// db.data.topic.push({
//     id:1,
//     title: 'lowdb',
//     description: 'lowdb is..',
//     author: 1
// });
// db.data.topic.push({
//     id:2,
//     title: 'mysql',
//     description: 'mysql is..',
//     author: 1
// });

// await db.write();

db.chain = lodash.chain(db.data)
// const post = db.chain
//   .get('topic')
//   .find({ title: 'lowdb', author: 1 })
//   .value()

// console.log(post);  // find함수 실행 하면 터미널에 { id: 1, title: 'lowdb', description: 'lowdb is..', author: 1 }가 뜸  

// db.chain
// .get('topic')
// .find({id:2})
// .assign({title:'MySQL & MariaDB'})
// .value();

// db.write(); // 여기까지 하면 json파일에 id: 2의 title이 수정됨 (update)

// db.chain
// .get('topic')
// .remove({id:2})
// .value();

// db.write();

            

var nid = nanoid();

db.chain
.get('author')
.push({
    id: nid,
    name: 'duru',
    profile: 'db admin',
})
.value();

db.chain
.get('topic')
.push({
    id: nanoid(),
    title:'MSSQL',
    description: 'MSSQL is...',
    author: nid
})
.value();



await db.write();



