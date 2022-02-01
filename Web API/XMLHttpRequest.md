# 바닐라 자바스크립트 By 고승원

> 
> 
> XMLHttpRequest 객체



##  1. 용어정리
    + XMLHttpRequest(XHR)객체는 서버와 상호작용하기 위해 사용됨
    + 전체 페이지를 새로고침하지 않아도 URL을 통해 데이터를 전송하거나 받을 수 있다.
    + XMLHttpRequest는 이름에 XML이 붙어서 XML데이터 통신으로 오해 받으나, 모든 종류의 
     데이터를 받아올 수 있다.
    + 브라우저에서 제공하는 Web API이기 때문에 브라우저 환경에서만 정상적으로 동작
    + node.js 환경에서는 제공되지 않는다.
    + XMLHttpRequest 생성자 함수를 호출해서 생성 한다.

##  2. 요청전송 종류(HTTP Method와 요청 URL 정의)
    + 클라이언트에서 서버로 요청을 보내기 위해선 HTTP Method와 요청 URL을 정의  
HTTP Method|의미
|------|---|
GET|리소소요청
POST|리소스 생성
PUT|리소스수정
PATCH|리소스 일부 수정
DELETE|리소스 삭제




    
##  3. setRequestHeader() 함수
    + 클라이언트에서 서버로 HTTP 요청을 하기 전에 요청에 맞는 헤더 값을 설정해야 한다.
    + setRequestHeader()함수를 통해 설정
    + 서버로 전송하는 데이터의 타입을 선언하기 위한 용도
    + 헤더값 중 content-type에 해당
    + 웹 개발 시 자주 사용하는 MIME(Multipurpose Internet Mail Extenstions)은 3가지
MIME 타입|content-type값 | 목적
|------|---|---|
application|application/json|json데이터 전송
text|text/plain|텍스트 데이터 전송
multipart|multipart/form-data|파일 전송
    
    
    
    

~~~Java Script
    const xhr = new XMLHttpRequest(); //XMLHttpRequest 객체 생성
    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/1"); // HTTP Method, URL 정의
    xhr.setRequestHeader("content-type", "application/json; charset=UTF-8"); // 헤더 값 중 content-type 정의
    xhr.send(); // 요청 전송

    xhr.onload = () => {

        if (xhr.status === 200) {
            // 정상적으로 응답되면 status가 200
            const res = JSON.parse(xhr.response); // 응답 데이터를 JSON.parse 함수로 JSON객체로 변경
            console.log(res); // 100개의 데이터를 받아옴
        } else {
            // 에러발생
            console.error(xhr.status, xhr.statusText); // 응답 상태와 응답메시지를 출력

        }
    };



    const xhr = new XMLHttpRequest(); // XMLHttpRequest 객체 생성
    xhr.open("POST", "https://jsonplaceholder.typicode.com/posts"); // HTTP Method, URL 정의
    xhr.setRequestHeader("content-type", "application/json; charset=UTF-8"); // 헤더 값 중 content-type 정의

    xhr.send(JSON.stringify({ title: "foo", body: "bar", userId: 1 }));// 요청 전송

    xhr.onload = () => {
        if (xhr.status === 201) {
            //201상태 코드는 요청이 성공적으로 처리되었으며 , 자원이 생성되었음을 나타내는 성공 상태 응답 코드입니다.
            // 일반적으로 post요청에 대한 응답 결과로 사용된다. 
            const res = JSON.parse(xhr.response); // 응답데이터를 JSON.parse 함수의 JSON 객체로 변경
            console.log(res) // 응답 데이터 출력

        } else { // 에러 발생
            console.error(xhr.status, xhr.statusText); // 응답 상태와 응답 메시지를 출력
        }
    }



    const xhr = new XMLHttpRequest(); // XMLHttpRequest 객체 생성
    xhr.open("PUT", "https://jsonplaceholder.typicode.com/posts/1"); //HTTP Method, URL 정의
    xhr.setRequestHeader("content-type", "application/json; charset=UTF-8"); //header 값 중 content-type 정의
    xhr.send(JSON.stringify({ title: "foo", body: "bar", userId: 1 })); // 요청 전송

    xhr.onload = () => {
        if (xhr.status === 200) {
            //PUT 요청이 정상적으로 완료되면 200
            const res = JSON.parse(xhr.response); // 응답데이터를 JSON.parse 객체로 변경
            console.log(res);
        } else {
            // 에러 발생
            console.error(xhr.status, xhr.statusText); // 응답 상태와 응답메시지를 출력
        }
    }



    const xhr = new XMLHttpRequest(); // XMLHttpRequest 객체 생성
    xhr.open("DELETE", "https://jsonplaceholder.typicode.com/posts/1"); // HTTP Method, URL 지정
    xhr.setRequestHeader("content-type", "application/jason"); // 헤더값 중 content-type 정의
    xhr.send(); // 요청 전송

    xhr.onload = () => {

        if (xhr.status === 200) {
            //DELETE 요청이 정상적으로 완료되면 200
            const res = JSON.parse(xhr.response); //응답데이터를 JSON.parse 함수의 JSON객체로 변경
            console.log(res);
        } else {
            console.error(xhr.status, xhr.statusText);
        }
    }
 ~~~
