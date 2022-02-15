##  1.  fs.rename(oldPath, newPath, callback) { }
    - 비동기적으로 oldPath에 있는 파일을 newPath에 제공된 pathname으로 변경한다. newPath가 이미 존재 한다면, 파일 이름이 겹쳐 쓰일 것이다. 
    - newPath에 있는게 다이렉터리라면, 에러가 대신 발생할 것이다. 
    - 가능한 예외(err)가 아닌 어떠한 인자도 fs.rename 함수가 수행된 후 호출되는 컬백함수에 제공되지 않는다.
    - 예: fs.rename(`data/${id}`, `data/${title}`, function (error) {
    
~~~Java Script
import { rename } from 'fs';

rename('oldFile.txt', 'newFile.txt', (err) => {
  if (err) throw err;
  console.log('Rename complete!');
});
~~~
