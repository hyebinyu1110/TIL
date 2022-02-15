## 1. fs.readdir('./data', function (error, filelist) {
    - fs.readdir(path[, options], callback) 메서드
    - path는 문자열, URL, 버퍼가 됨
    - option은 인코딩 방식이나, fileType이 옴
    - callback함수는 (err, files) 두 인자를 받는데, files인자는 '.' 과'..'을 제외한  다이렉터리 내  파일들의 이름의 배열을 가지고 있다.
   
