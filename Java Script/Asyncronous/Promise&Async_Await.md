# 바닐라 자바스크립트 By 고승원

> 책에서 공부한 내용과 내가 좀 더 공부하여 이해한만큼의 내용을 정리하여 적기
> 
> Promise & Async/Await
-----
#  Promise(이해하기 어렵다)

##  1. 몇시간 동안 써칭하며, 이해하려 노력하며 생각한 것
    + 공부를 하고 있는 과정이라 완벽하게 이해했다는 느낌이 들지 않는다.
    + 몇시간을 써칭해서 이해한바로는
    + HTTP는 원래 동기 통신만 가능했다 즉, 클라이언트가 서버에 자료를 요청하면 그 요청에 대해 서버가 응답을해야(자료를 보내야) 
      하나의 통신이 끝나고 다음 작업으로 넘어갈 수 있었다. 
    + 그러다가 AJAX(Asyncronous JavaScript and XML) 즉, 자바스크립트와 XML 문서를 사용할 때, 
      비동기적으로 통신을 가능하게 하는 기술이 도입되면서, 
      하나의 클라이언트 요청이 끝나기를 기다리지 않고, 그 다음 작업(코드)를 실행할 수 있는 기술이라고 한다.
    + XMLHttpRequest는 서버로부터 자료를 받아오는 비동기 함수이다. 객체로 작업을 요청하고 다음 작업을 하면 된다. 
    + 응답을 기다리는 동안 다른 작업을 하는게 사용자에겐 UI/UX가 높아진다. 빠르게 웹을 티키타카 식으로 사용할 수 있다.
    + 그래도 비동기화 작업도 서버로부터 응답이 들어오면 그에 합당한 작업이 필요하니까 비동기 작업 응답에 대한 처리를
      Promise 객체를 사용해 핸들링 한다.
    
 ##  2. 용어정리
     + Promise는 자바스크립트에서 비동기 처리에 사용되는 객체이다. 
     + 비동기 처리란 특정코드의 실행이 완료되기를 기다리지 않고, 다음 코드를 실행할 수 있게 해주는 방식을 의미
     + Promise는 자바스크립트에서 브라우저에서 제공하는 비동기함수인 Web API를 실행할 때, 실행한 코드가 완료될 때까지
      대기하지 않고, 바로 다음 코드를 실행할 수 있도록 해주고, 비동기함수의 실행이 완료되면, then()함수를 통해서
      그 결과에 대한 코드를 실행할 수 있게 한다.
     + Promise는 new 생성자 함수를 사용해서 생성한다.
     + 요청에 대한 응답 성공 -> resolve()함수에 결과 전달
     + 요청에 대한 응답 실패 -> reject()함수에 에러를 전달
     
~~~Java Script
const promise = new Promise((resolve, reject) =>{
if("처리성공"){
resolve("결과 데이터");
}else{
reject(new Error("에러"));
}
});
~~~
+ XMLHttpRequest는 비동기 통신이고 , 요청에 대한 응답이 없더라도 자바스크립트에 작성된 코드가 바로 실행이 된다.
~~~Java Script
function getData() {
    const xhr = new XMLHttpRequest(); // XMLHttpRequest 객체 생성
    xhr.open("GET","https://jsonplaceholder.typicode.com/posts/1"); // HTTP Method, URI 정의
    xhr.setRequestHeader("content-type", "application/json"); // 헤더 값 중 content-type 값 정의
    xhr.send(); // 요청 전송


    xhr.onload = () =>{

        if(xhr.status ===200){
            // 정상적으로 응답되면 status가 200
            const res = JSON.parse(xhr.response); // 응답데이터를 JSON.parse함수의 JSON 객체로 변경
            console.log(res);
            return res;
        }else{

            // 에러 발생
             console.error(xhr.status, xhr.statusText); // 응답상태와 응답메시지 출력
             return;
        }
    };
}

 const res = getData(); // 함수 호출
 console.log(res); // 코드가 실행되고 , 이 시점에는 서버로부터 응답이 오지않는 시점이기 때문에 undefined
 
 console.log("다음 코드를 실행합니다.");
 ~~~
 ~~~Java Script
 <위 코드 콘솔창 결과>

undefined
test.html:195 다음 코드를 실행합니다.
test.html:181 {userId: 1, id: 1, title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit', 
body: 'quia et suscipit\nsuscipit recusandae consequuntur …strum rerum est autem sunt rem eveniet architecto'}
~~~


+ XMLHttpRequest결과보다 먼저 console.log("다음 코드를 실행합니다.");이 실행된다. 이게 비동기 처리이다. 
+ 여기까진 Promise의 필요성이 보이지 않는데, 
+ `클라이언트에서 서버로 요청을 보내고 서버로부터 응답받은 데이터를 이용해 구현해야 하는 코드가 있는 경우`, 문제가 발생
+ 이때 Promise를 사용하면, 응답이 완료된 후 호출되는 then() 함수를 통해 결과를 받고, 구현해야할 코드를 작성해서 
  사용가능
+ 아래의 예제는 서버로부터 응답을 받고, 정상적으로 작동하는 경우 , then()함수를 실행하여 그때서야  console.log("다음 코드를 실행합니다.")
가 실행 된다.

 ~~~Java Script

function getDataPromise(){

    return new Promise((resolve, reject) => { //Promise 객체 생성
        const xhr = new XMLHttpRequest(); // XMLHttpReguest 객체 생성
        xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/1"); // HTTP Method, URL 정의
        xhr.setRequestHeader("content-type", "application/json") // 헤더 값 중 content-type 정의
        xhr.send(); // 요청 전송

        xhr.onload = () =>{

            if(xhr.status === 200){
                // 정상적으로 작동하면 status 가 200
                const res = JSON.parse(xhr.response); // 응답 데이터를 JSON.parse 함수의 JSON 객체로 변경
        
                resolve(res);
                
                
            }else{
                // 에러발생
                console.error(xhr.staus, xhr.statusText); // 응답 상태와 응답메시지를 출력
                reject(new Error(xhr.status));
            }
        };
    });
}

getDataPromise().then((res) =>{
    
    console.log(res); // 서버응답이 완료된 후 코드가 실행됨
    console.log("다음 코드를 실행합니다.");
});
~~~

<위 코드 콘솔창 결과>
~~~Java Script
{userId: 1, id: 1, title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit', 
body: 'quia et suscipit\nsuscipit recusandae consequuntur …strum rerum est autem sunt rem eveniet architecto'}
test.html:171 다음 코드를 실행합니다.
~~~



#  Async/Await(또, 이해하기 어렵다)

##  1. 용어정리
    + Async/Await 역시 Promise와 동일한 목적으로 사용한다. 
    + Async는 말그대로 비동기 실행을 말하며, Await는 비동기를 실행하는데 결과가 올때까지 기다리겠다는 것
    
##  2. 용어정리
    + Fetch API는 그 자체가 Promise이다. 아래의 예제 코드처럼 서버로부터 응답이오면 then()함수를 이용해서
      응답받은 결과를 이용한 코드를 작성가능 
      
~~~Java Script
function myfunction(){
    fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
    //코드 구현
    });
}
~~~

##  3. 문제점
    + 그런데, 서버로 요청을 보내고 응답을 보낸 후  응답받은 결과를 바탕으로 다시 서버로 요청을 보내는 코드를
    작성해야 한다면 다음과 같이 코드가 매우 복잡해지고, 가독성이 떨어진다.
    
~~~Java Script
function myFunction(){
    //서버로 요청을 보내고 응답을 보낸 후 응답을 받은 결과를 바탕으로 다시 서버로 요청을 보내야 하는 코드를 
    //작성해야 한다면 다음과 같이 코드가 복잡해지고, 가독성이 떨어지게 됨.

    fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) =>response.json())
    .then((json) =>{
        console.log(json);
        fetch("https://jsonplaceholder.typicode.com/posts/1", { 
            method: "PUT",
            body: JSON.stringify({
                id: 1, 
                title: 'foo',
                body: 'bar',
                userId: 1,
            }),
            headers: {
                'content-type': 'application/json ; charset="UTF-8"',
            },
            }).then((response) => response.json())
            .then((json) => console.log(json));
    });
}

myFunction();

~~~
##  4. 해결 방책
    + Async/Await 를 사용하면 코드가 간결하고 가독성이 높은 코드를 구현할 수 있다.
    + 비동기 함수를 호출할 때 await을 정의하면 비동기 함수가 실행되고, 서버로 부터 응답을 받을때까지 
      대기한 후(await) 결과를 받으면 실행되도록 하게한다.
    + Async/Await는 같은 스코프에서 결과 값을 관리할 수 있기때문에 훨씬 효율적으로 프로그램 코드를 구현할 수 있게 해준다. 
    + await를 사용하는 코드가 작성된 함수는 반드시 async 여야 한다. 
      함수키워드인 function 앞에 async 키워드가 있는 것을 확인할 수 있다. 

~~~Java Script
async function myFunction(){
    const res1 = await fetch(
        "https://jsonplaceholder.typicode.com/posts/1"
    );
    const res1Json = await res1.json();
    console.log(res1Json);

    const res2 = await  fetch("https://jsonplaceholder.typicode.com/posts/1", { 
            method: "PUT",
            body: JSON.stringify({
                id: 1, 
                title: 'foo',
                body: 'bar',
                userId: 1,
            }),
            headers: {
                'content-type': 'application/json ; charset="UTF-8"',
            },
            
        });

        const res2Json = await res2.json();
        console.log(res2Json);
}

myFunction();
console.log("hello");
~~~

<위 코드 콘솔창 결과>
+ Async/Await의 내용이 모두 처리 되야 마지막 코드인 hello 출력이 된다.

~~~Java Script
{userId: 1, id: 1, title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
body: 'quia et suscipit\nsuscipit recusandae consequuntur …strum rerum est autem sunt rem eveniet architecto'}
test.html:74 {id: 1, title: 'foo', body: 'bar', userId: 1}
test.html:75 hello
~~~

##  5. 여기까지 공부하며 깨달은 점
    + Promise 객체와 Async/Await 가 쓰일때를 깨달았다. 
    + 위에 Promise를 설명하며 적은 바와 같이 `클라이언트에서 서버로 요청을 보내고 서버로부터 응답받은 데이터를 이용해 
      구현해야 하는 코드가 있는 경우`
      `이때 Promise를 사용하면, 응답이 완료된 후 호출되는 then() 함수를 통해 결과를 받고, 구현해야할 코드를 작성해서 
      사용가능`
    + Async/Await는 Promise의 가독성을 높이는 버전이라 하겠다. 
    
    
+ 참조 [자바스크립트 Promise 쉽게 이해하기](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/)
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    


 
