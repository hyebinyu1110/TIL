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
