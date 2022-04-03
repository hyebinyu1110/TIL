1. require 모듈이 실행이 안되고 아래의 오류가 뜸.

~~~Java Script
const low = require('lowdb');
            ^

Error [ERR_REQUIRE_ESM]: require() of ES Module C:\Users\HBYU\Desktop\lowdb\node_modules\lowdb\lib\index.js 
from C:\Users\HBYU\Desktop\lowdb\main.js not supported.
Instead change the require of index.js in C:\Users\HBYU\Desktop\lowdb\main.js to a dynamic import() which is
available in all CommonJS modules.
    at Object.<anonymous> (C:\Users\HBYU\Desktop\lowdb\main.js:1:13) {
  code: 'ERR_REQUIRE_ESM'
}
~~~ 

     - 어떻게 하다가 써칭해서 package.json 파일에 아래의 내용 추가
~~~Java Script
    "type": "module",
~~~
     - 위의 코드를 추가 하니 다시 아래의 오류 발생
~~~Java Script
ReferenceError: require is not defined in ES module scope, you can use import instead
This file is being treated as an ES module because it has a '.js' file extension and 
'C:\Users\HBYU\Desktop\lowdb\package.json' contains "type": "module". To treat it as a CommonJS script,
rename it to use the '.cjs' file extension.
~~~
    - 그래서 아래의 코드를 추가 하니, 제대로 실행된다. 
~~~Java Script
  "exports": {
  "require": "./index.js",
  "import": "./esm/wrapper.js"
},  
~~~

    - main.js 에 적힌 full code, require 방식으로 모듈을 가져왔는데 import하는식으로 바뀜
    - 문제는 CommonJS 방식으로 ESM Module을  가져올수 없다는 것이였음.
    - 이해하려면 공부를 많이 해야 할듯
~~~Java Script
/*
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync'); 
// 어떤 방식으로 데이터를 저장할 것인가라는 것에 따라 우리가 가져와야할 모듈이 달라진다.  
파일의 동기방식으로 저장하겠다라는 의미
const adapter = new FileSync('db.json');// 우리 데이터를 db.json이라고 하는 파일의 JSON의 형식에 따라 저장하겠다라는 의미 
const db = low(adapter); // lowdb에게 adapter라고 하는 db.json파일에다가 동기방식으로 저장하겠다라고 이렇게 지정해줌.
db라는 변수를 통해 lowdb를 제어할 수 있게된다. 
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
db.data ||= { posts: [] }             // Node >= 15.x

// Create and query items using plain JS
db.data.posts.push('hello world')
const firstPost = db.data.posts[0]

// Alternatively, you can also use this syntax if you prefer
const { posts } = db.data
posts.push('hello world')

// Finally write db.data content to file
await db.write()
~~~



- 참조: [lowdb](https://github.com/typicode/lowdb)
- 참조: [CommonJS와 ES Modules은 왜 함께 할 수 없는가?](https://yceffort.kr/2020/08/commonjs-esmodules)
- 참조: [[LOWDB] JSON을 DB로 활용하는 방법](https://fehoon.tistory.com/159)
- 
