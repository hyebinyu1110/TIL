# 바닐라 자바스크립트 By 고승원

> 
> 
> Fetch API(네트워크 통신을 포함한 리소소 취득을 위한 인터페이스가 정의되어있다)



##  1. 용어정리
    + Fetch API와 XMLHttpRequest 의 가장 큰 차이점?
    + Fetch API는 Promise 방식으로 구현되어 있다.
    + XMLHttpRequest에 비해 코드가 훨씬 간결
    + fetch()함수를 통해 데이터를 요청하고, 응답이 이루어지면 응답받은 결과는 then()함수
    의 인수로 전달 받게 됨.  
    + 응답받은 데이터는 문자열 형식이므로  response.json()함수를 호출해서 json 데이터로
    변경을 실행

##  2. FormData 객체
    + 파일을 포함한 데이터를 전송하도록 해주는 객체이다.
    + HTML의 form 태그에 해당하는 form필드와 그 값을 나타내는 일련의 키-값 쌍을
     쉽게 생성할 수 있게 해주는 객체
    + 일반적 텍스트 데이터 뿐만 아니라, 파일을 서버로 전송할 수 있도록 해준다.

    
    
    

~~~Java Script

    // 데이터 획득
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => console.log(json));




    // 데이터 수정
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST", // HTTP 요청방법
        body: JSON.stringify({ // 전송할 데이터
            title: "foot",
            body: "bar",
            userId: 1,
        }),

        headers: { // 헤더값 정의
            "content-type": "application/json; charset=UTF-8", // content-type 정의
        },
    }).then((response) => response.json())
        .then((json) => console.log(json));


    // 데이터 삭제
    fetch("https://jsonplaceholder.typicode.com/posts/1", {
        method: "DELETE"
    })
        .then((response) => response.json)
        .then((json) => console.log(json));

    /*
     *  파일을 업로드 하는 경우, FormData 객체를 사용한다.
     * FormData는 HTML 의 form 태그에 해당하는 form필드와 그 값을 나타내는 일련의 키-쌍을 쉽게 생성하게 할 수 있게 해주는 객체.
     * 일반 적인 텍스트 데이터 뿐만 아니라, 파일을 서버로 보낼 수 있다. json 데이터를 보내는 형식과 비슷한데, 파일을 객체에 추가하는 형식
     */


    let formData = new FormData(); // FormData 객체 생성, FormData는 파일을 포함한 데이터를 전송할 수 있도록 해주는 객체.
    let fileField = document.querySelector("input[type='file']"); // 사용자가 선택한 파일

    formData.append("username", "abc123"); // 텍스트 데이터
    formData.append("attachment", fileField.files[0]); // 파일

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: 'POST',
        body: formData,
    })
        .then((response) => response.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => console.log("Success: ", JSON.stringify(response)));



    // 2개 이상의 다중파일도 서버로 전송
    let formData = new FormData();
    let photos = document.querySelector("input[type='file']"); // 다중 파일 선택 HTML 요소

    formData.append("title", "My Photos");
    console.log(formData);
    for (let i = 0; i < photos.length; i++) {
        //선택한 파일 수 만큼 반복문을 사용해서 FormData에 삽입
        formData.append("photos", photos.files[i]);

    }

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: formData

    })
        .then((response) => response.json)
        .then((response) => console.log("Success:", JSON.stringify(response)))
        .catch((error) => console.error("Error:", error));

~~~
